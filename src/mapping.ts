import { near, BigInt, log, BigDecimal, json, JSONValueKind, bigInt } from "@graphprotocol/graph-ts"
import { Collection, Contract, Market, Token } from "../generated/schema"

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions;
  for (let i = 0; i < actions.length; i++) {
    handleAction(
      actions[i],
      receipt.receipt,
      receipt.block.header,
      receipt.outcome,
      receipt.receipt.signerPublicKey
    );
  }
}

function handleAction(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  blockHeader: near.BlockHeader,
  outcome: near.ExecutionOutcome,
  publicKey: near.PublicKey,

): void {

  if (action.kind !== near.ActionKind.FUNCTION_CALL) {
    log.info("Early return: {}", ["Not a function call"]);
    return;
  }

  const functionCall = action.toFunctionCall();

  if(functionCall.methodName == "add_user_collection"){
    log.info('entro a agregar coleccion',[])
    let jsonData = outcome.logs[0]
    let parsedJSON = json.fromString(jsonData)
    let colID = "0"
    let contAdd = ""
    let owner = ""
    let title = ""
    let desc = ""
    let mediaIcon = ""
    let mediaBann = ""
    if(parsedJSON.kind == JSONValueKind.OBJECT){
      let entry = parsedJSON.toObject()
      for(let i = 0;i < entry.entries.length; i++){
        let key = entry.entries[i].key.toString()
        log.info('key:{} value:{}',[key,entry.entries[i].value.toString()])
        switch(true){
          case key == 'collection_num':
            colID = entry.entries[i].value.toString()
            break
          case key == 'contract_address':
            contAdd = entry.entries[i].value.toString()
            break
          case key == 'owner_id':
            owner = entry.entries[i].value.toString()
            break
          case key == 'title':
            title = entry.entries[i].value.toString()
            break
          case key == 'description':
            desc = entry.entries[i].value.toString()
            break
          case key == 'icon_media':
            mediaIcon = entry.entries[i].value.toString()
            break
          case key == 'banner_media':
            mediaBann = entry.entries[i].value.toString()
            break
        }
      }
    }
    //let data = outcome.logs[0].split(',')
    let collection = new Collection(colID+'-'+contAdd+'-'+title)//collectionID-contractID-Nombre_de_coleccion
    let contract = Contract.load(contAdd)
    if(contract == null){
      contract = new Contract(contAdd)
      contract.owner = owner
      contract.contractID = contAdd
      contract.tokenCount = BigInt.fromI32(0)
      contract.collectionCount = BigInt.fromI32(0)
      contract.collections = []
    }
    collection.contract = contAdd
    collection.owner = owner
    collection.title = title
    collection.description = desc
    collection.tokenCount = BigInt.fromI32(0)
    collection.saleCount = BigInt.fromI32(0)
    collection.saleVolume = BigDecimal.zero()
    collection.mediaIcon = mediaIcon
    collection.mediaBanner = mediaBann
    collection.collectionID = BigInt.fromString(colID)
    collection.tokens = []
    contract.collectionCount = contract.collectionCount + BigInt.fromI32(1)
    contract.collections.push(colID+'-'+contAdd+'-'+title)
    contract.save()
    collection.save()
    log.info('se guardo la coleccion',[])
  }

  if (functionCall.methodName == "save_mint_ttg") {
    log.info("Entro a minar", [])
    let jsonData = outcome.logs[0]
    let parsedJSON = json.fromString(jsonData)
    let contAdd = ""
    let colName = ""
    let colID = ""
    let tokID = ""
    let owner = ""
    let title = ""
    let desc = ""
    let media = ""
    let creator = ""
    let price = ""
    let status = ""
    let addBid = ""
    let highBid = ""
    let lowBid = ""
    let expires = ""
    let starts = ""
    let extra = ""
    if(parsedJSON.kind == JSONValueKind.OBJECT){
      let entry = parsedJSON.toObject()
      for(let i = 0;i < entry.entries.length; i++){
        let key = entry.entries[i].key.toString()
        let value = entry.entries[i].value.toString()
        log.info('key:{} value:{}',[key,value])
        switch(true){
          case key == 'contract_name':
            contAdd = value
            break
          case key == 'collection':
            colName = value
            break
          case key == 'collection_id':
            colID = value
            break
          case key == 'token_id':
            tokID = value
            break
          case key == 'owner_id':
            owner = value
            break
          case key == 'title':
            title = value
            break
          case key == 'description':
            desc = value
            break
          case key == 'media':
            media = value
            break
          case key == 'creator':
            creator = value
            break
          case key == 'price':
            price = value
            break
          case key == 'status':
            status = value
            break
          case key == 'adressbidder':
            addBid = value
            break
          case key == 'highestbid':
            highBid = value
            break
          case key == 'lowestbid':
            lowBid = value
            break
          case key == 'expires_at':
            expires = value
            break
          case key == 'starts_at':
            starts = value
            break
          case key == 'extra':
            extra = value
            break
        }
      }
    }
    log.info("Log: {}",[outcome.logs[0]])
    let token = new Token(tokID + '-' + creator + '-' + colName);//tokenId-Creator-Collection
    let collection= Collection.load(colID+'-'+contAdd+'-'+colName)
    let contract = Contract.load(contAdd)
    if(collection == null) {
      log.info("No se encontro la coleccion", [])
      collection = new Collection(colID+'-'+contAdd+'-'+colName)
      collection.title = colName
      collection.tokenCount = BigInt.fromI32(0)
      collection.saleCount = BigInt.fromI32(0)
      collection.saleVolume = BigDecimal.zero()
      collection.collectionID = bigInt.fromString(colID)
      collection.tokens = []
      collection.owner = owner
      collection.contract = contAdd
    }
    if(contract == null){
      log.info('No se encontro el contrato',[])
      contract = new Contract(contAdd)
      contract.contractID = contAdd
      contract.owner =owner
      contract.tokenCount = BigInt.fromI32(0)
      contract.collectionCount = BigInt.fromI32(1)
      contract.collections = []
      contract.collections.push(colID+'-'+contAdd+'-'+colName)
    }
    token.collection = colName
    token.collectionID = BigInt.fromString(colID)
    token.contract = contAdd
    token.tokenId = BigInt.fromString(tokID);
    token.owner_id = owner;
    token.title = title;
    token.description = desc;
    token.media = media;
    token.creator = creator;
    token.price = BigInt.fromString(price);
    token.status = status;
    token.adressbidder = addBid;
    token.highestbidder = highBid;
    token.lowestbidder = lowBid;
    token.expires_at = expires;
    token.starts_at = starts;
    token.extra = extra;
    collection.tokens.push(tokID + '-' + creator + '-' + colName)
    collection.tokenCount = collection.tokenCount + BigInt.fromI32(1);
    contract.tokenCount = contract.tokenCount + BigInt.fromI32(1);
    contract.save()
    collection.save()
    token.save()
    log.info("Se guardo el NFT", [])
  }

  if (functionCall.methodName == "save_buy_ttg"){
    log.info("Entro en compra", [])
    let jsonData = outcome.logs[0]
    let parsedJSON = json.fromString(jsonData)
    let contAdd = ""
    let colName = ""
    let colID = ""
    let tokID = ""
    let owner = ""
    let title = ""
    let desc = ""
    let media = ""
    let creator = ""
    let price = ""
    let status = ""
    let addBid = ""
    let highBid = ""
    let lowBid = ""
    let expires = ""
    let starts = ""
    let extra = ""
    if(parsedJSON.kind == JSONValueKind.OBJECT){
      let entry = parsedJSON.toObject()
      for(let i = 0;i < entry.entries.length; i++){
        let key = entry.entries[i].key.toString()
        let value = entry.entries[i].value.toString()
        log.info('key:{} value:{}',[key,value])
        switch(true){
          case key == 'contract_name':
            contAdd = value
            break
          case key == 'collection':
            colName = value
            break
          case key == 'collection_id':
            colID = value
            break
          case key == 'token_id':
            tokID = value
            break
          case key == 'owner_id':
            owner = value
            break
          case key == 'title':
            title = value
            break
          case key == 'description':
            desc = value
            break
          case key == 'media':
            media = value
            break
          case key == 'creator':
            creator = value
            break
          case key == 'price':
            price = value
            break
          case key == 'status':
            status = value
            break
          case key == 'adressbidder':
            addBid = value
            break
          case key == 'highestbid':
            highBid = value
            break
          case key == 'lowestbid':
            lowBid = value
            break
          case key == 'expires_at':
            expires = value
            break
          case key == 'starts_at':
            starts = value
            break
          case key == 'extra':
            extra = value
            break
        }
      }
    }
    log.info("Log: {}",[outcome.logs[0]])
    let token = Token.load(tokID + '-' + creator + '-' + colName)
    let collection= Collection.load(colID+'-'+contAdd+'-'+colName)
    if(token == null){
      log.info("No se encontro el token",[])
      token = new Token(tokID + '-' + creator + '-' + colName)
      token.collection = colName
      token.collectionID = BigInt.fromString(colID)
      token.contract = contAdd
      token.tokenId = BigInt.fromString(tokID);
      token.owner_id = owner;
      token.title = title;
      token.description = desc;
      token.media = media;
      token.creator = creator;
      token.price = BigInt.fromString(price);
      token.status = status;
      token.adressbidder = addBid;
      token.highestbidder = highBid;
      token.lowestbidder = lowBid;
      token.expires_at = expires;
      token.starts_at = starts;
      token.extra = extra;
    }
    if(collection == null) {
      log.info("No se encontro la coleccion", [])
      collection = new Collection(colID+'-'+contAdd+'-'+colName)
      collection.title = title
      collection.tokenCount = BigInt.fromI32(0)
      collection.saleCount = BigInt.fromI32(0)
      collection.saleVolume = BigDecimal.zero()
      collection.tokens = []
      collection.owner = owner
      collection.collectionID = BigInt.fromString(colID)
      collection.contract = contAdd
    }
    token.status = status
    token.owner_id = owner
    collection.saleCount = collection.saleCount + BigInt.fromI32(1)
    collection.saleVolume = collection.saleVolume + BigDecimal.fromString(price)
    token.save()
    collection.save()
    log.info("se compro un NFT",[])
  }
  
  if (functionCall.methodName == "save_remove_ttg"){
    log.info("Entro en quitar de la venta", [])
    let jsonData = outcome.logs[0]
    let parsedJSON = json.fromString(jsonData)
    let contAdd = ""
    let colName = ""
    let colID = ""
    let tokID = ""
    let owner = ""
    let title = ""
    let desc = ""
    let media = ""
    let creator = ""
    let price = ""
    let status = ""
    let addBid = ""
    let highBid = ""
    let lowBid = ""
    let expires = ""
    let starts = ""
    let extra = ""
    if(parsedJSON.kind == JSONValueKind.OBJECT){
      let entry = parsedJSON.toObject()
      for(let i = 0;i < entry.entries.length; i++){
        let key = entry.entries[i].key.toString()
        let value = entry.entries[i].value.toString()
        log.info('key:{} value:{}',[key,value])
        switch(true){
          case key == 'contract_name':
            contAdd = value
            break
          case key == 'collection':
            colName = value
            break
          case key == 'collection_id':
            colID = value
            break
          case key == 'token_id':
            tokID = value
            break
          case key == 'owner_id':
            owner = value
            break
          case key == 'title':
            title = value
            break
          case key == 'description':
            desc = value
            break
          case key == 'media':
            media = value
            break
          case key == 'creator':
            creator = value
            break
          case key == 'price':
            price = value
            break
          case key == 'status':
            status = value
            break
          case key == 'adressbidder':
            addBid = value
            break
          case key == 'highestbid':
            highBid = value
            break
          case key == 'lowestbid':
            lowBid = value
            break
          case key == 'expires_at':
            expires = value
            break
          case key == 'starts_at':
            starts = value
            break
          case key == 'extra':
            extra = value
            break
        }
      }
    }
    log.info("Log: {}",[outcome.logs[0]])
    let token = Token.load(tokID + '-' + creator + '-' + colName)
    if(token==null){
      log.info("No se encontro el token",[])
      token = new Token(tokID + '-' + creator + '-' + colName)
      token.collection = colName
      token.collectionID = BigInt.fromString(colID)
      token.contract = contAdd
      token.tokenId = BigInt.fromString(tokID);
      token.owner_id = owner;
      token.title = title;
      token.description = desc;
      token.media = media;
      token.creator = creator;
      token.price = BigInt.fromString(price);
      token.status = status;
      token.adressbidder = addBid;
      token.highestbidder = highBid;
      token.lowestbidder = lowBid;
      token.expires_at = expires;
      token.starts_at = starts;
      token.extra = extra;
    }
    token.status = status
    token.save()
    log.info("se quito de la venta un NFT",[])
  }

  if (functionCall.methodName == "save_sell_ttg"){
    log.info("Entro en vender", [])
    let jsonData = outcome.logs[0]
    let parsedJSON = json.fromString(jsonData)
    let contAdd = ""
    let colName = ""
    let colID = ""
    let tokID = ""
    let owner = ""
    let title = ""
    let desc = ""
    let media = ""
    let creator = ""
    let price = ""
    let status = ""
    let addBid = ""
    let highBid = ""
    let lowBid = ""
    let expires = ""
    let starts = ""
    let extra = ""
    if(parsedJSON.kind == JSONValueKind.OBJECT){
      let entry = parsedJSON.toObject()
      for(let i = 0;i < entry.entries.length; i++){
        let key = entry.entries[i].key.toString()
        let value = entry.entries[i].value.toString()
        log.info('key:{} value:{}',[key,value])
        switch(true){
          case key == 'contract_name':
            contAdd = value
            break
          case key == 'collection':
            colName = value
            break
          case key == 'collection_id':
            colID = value
            break
          case key == 'token_id':
            tokID = value
            break
          case key == 'owner_id':
            owner = value
            break
          case key == 'title':
            title = value
            break
          case key == 'description':
            desc = value
            break
          case key == 'media':
            media = value
            break
          case key == 'creator':
            creator = value
            break
          case key == 'price':
            price = value
            break
          case key == 'status':
            status = value
            break
          case key == 'adressbidder':
            addBid = value
            break
          case key == 'highestbid':
            highBid = value
            break
          case key == 'lowestbid':
            lowBid = value
            break
          case key == 'expires_at':
            expires = value
            break
          case key == 'starts_at':
            starts = value
            break
          case key == 'extra':
            extra = value
            break
        }
      }
    }
    log.info("Log: {}",[outcome.logs[0]])
    let token = Token.load(tokID + '-' + creator + '-' + colName)
    if(token==null){
      log.info("No se encontro el token",[])
      token = new Token(tokID + '-' + creator + '-' + colName)
      token.collection = colName
      token.collectionID = BigInt.fromString(colID)
      token.contract = contAdd
      token.tokenId = BigInt.fromString(tokID);
      token.owner_id = owner;
      token.title = title;
      token.description = desc;
      token.media = media;
      token.creator = creator;
      token.price = BigInt.fromString(price);
      token.status = status;
      token.adressbidder = addBid;
      token.highestbidder = highBid;
      token.lowestbidder = lowBid;
      token.expires_at = expires;
      token.starts_at = starts;
      token.extra = extra;
    }
    token.status = status
    token.price = BigInt.fromString(price)
    token.save()
    log.info("se puso a la venta un NFT",[])
  }
}