import { near, BigInt, log, BigDecimal, json, JSONValueKind, bigInt,} from "@graphprotocol/graph-ts"
import { Minter, Market, Profile, Token, Bid, Action, Collection, Serie } from "../generated/schema"

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
  
  //Funciones del minter
  if(functionCall.methodName == "nft_mint"){
    log.info('entro a minar token',[])
    log.info("Log: {}",[outcome.logs[0]])
  }

  if(functionCall.methodName == "nft_transfer"){
    log.info('entro a nft_transfer',[])
    log.info("Log: {}",[outcome.logs[0]])
  }

  if(functionCall.methodName == "add_new_profile"){
    log.info('Entro a info_perfil',[])
    // log.info("Log: {}",[outcome.logs[0]])
    let jsonData = outcome.logs[0]
    let parsedJSON = json.fromString(jsonData)
    let acc = ""
    let med = ""
    let bio = ""
    let socMed = ""
    let type =""
    if(parsedJSON.kind == JSONValueKind.OBJECT){
      let entry = parsedJSON.toObject()
      let data = entry.entries[0].value.toObject()
      type = entry.entries[1].value.toString()
      log.info("type: {}",[type])
      for(let i = 0;i < data.entries.length; i++){
        let key = data.entries[i].key.toString()
        log.info("key: {}",[key])
        switch(true){
          case key == 'username':
            acc = data.entries[i].value.toString()
            break
          case key == 'media':
            med = data.entries[i].value.toString()
            break
          case key == 'biography':
            bio = data.entries[i].value.toString()
            break
          case key == 'social_media':
            socMed = data.entries[i].value.toString()
            break
        }
      }
    }
    if(type == "create"){
      let profile = new Profile(acc)
      profile.username = acc
      profile.biography = bio
      profile.socialMedia = socMed
      profile.media = med
      profile.tokBought = BigInt.fromI64(0)
      profile.tokCreated = BigInt.fromI64(0)
      profile.timestamp = BigInt.fromString(blockHeader.timestampNanosec.toString())
      profile.save()
      log.info("se guardo el perfil",[])
    }
    if(type == "edit"){
      let profile = Profile.load(acc)
      if(profile==null){
        profile = new Profile(acc)
        profile.username = acc
        profile.biography = bio
        profile.socialMedia = socMed
        profile.media = med
        profile.tokBought = BigInt.fromI64(0)
        profile.tokCreated = BigInt.fromI64(0)
        profile.timestamp = BigInt.fromString(blockHeader.timestampNanosec.toString())
        log.info("se edito el perfil",[])
      }
      profile.biography = bio
      profile.socialMedia = socMed
      profile.media = med
      profile.save()
    }
  }

  if(functionCall.methodName == "add_new_user_collection"){
    log.info('Entro a crear coleccion',[])
    // log.info("Log: {}",[outcome.logs[0]])
    let jsonData = outcome.logs[0]
    let parsedJSON = json.fromString(jsonData)
    let colID = ""
    let desc = ""
    let medBan = ""
    let medIcon =""
    let own = ""
    let tit = ""
    if(parsedJSON.kind == JSONValueKind.OBJECT){
      let entry = parsedJSON.toObject()
      let data = entry.entries[0].value.toObject()
      for(let i = 0;i < data.entries.length; i++){
        let key = data.entries[i].key.toString()
        log.info("key: {}",[key])
        switch(true){
          case key == 'collection_id':
            colID = data.entries[i].value.toString()
            break
          case key == 'description':
            desc = data.entries[i].value.toString()
            break
          case key == 'media_banner':
            medBan = data.entries[i].value.toString()
            break
          case key == 'media_icon':
            medIcon = data.entries[i].value.toString()
            break
          case key == 'owner_id':
            own = data.entries[i].value.toString()
            break
          case key == 'title':
            tit = data.entries[i].value.toString()
            break
        }
      }
    }
    let minter = Minter.load('Minter')
    if(minter == null){
      minter = new Minter('Minter')
      minter.contract = ""
      minter.collectionCount = BigInt.fromI32(0)
      minter.tokenCount = BigInt.fromI32(0)
    }
    let coleccion = new Collection(colID)
    coleccion.collectionID = BigInt.fromString(colID)
    coleccion.owner_id = own
    coleccion.title = tit
    coleccion.description = desc
    coleccion.mediaBanner = medBan
    coleccion.mediaIcon = medIcon
    coleccion.tokenCount = BigInt.fromI32(0)
    coleccion.saleVolume = BigDecimal.fromString('0')
    coleccion.salesCount = BigInt.fromI32(0)
    coleccion.timestamp = BigInt.fromString(blockHeader.timestampNanosec.toString())
    coleccion.visibility = true
    minter.collectionCount = minter.collectionCount + BigInt.fromI32(1)
    minter.save()
    coleccion.save()
    log.info("se guardo la coleccion",[])
  }

  //Agregar un NFT a una coleccion
  if(functionCall.methodName == "add_token_to_collection"){
    log.info('Entro a agregar token',[])
    log.info('Receiver ID: {}',[receipt.receiverId])
    let jsonData = outcome.logs[0]
    let parsedJSON = json.fromString(jsonData)
    let colID = ""
    let cont = ""
    let crea = ""
    let desc = ""
    let med = ""
    let own = ""
    let tit = ""
    let tokID = ""
    if(parsedJSON.kind == JSONValueKind.OBJECT){
      let entry = parsedJSON.toObject()
      let data = entry.entries[0].value.toObject()
      for(let i = 0;i < data.entries.length; i++){
        let key = data.entries[i].key.toString()
        log.info("key: {}",[key])
        switch(true){
          case key == 'collectionID':
            colID = data.entries[i].value.toString()
            break
          case key == 'contract_id':
            cont = data.entries[i].value.toString()
            break
          case key == 'creator':
            crea = data.entries[i].value.toString()
            break
          case key == 'description':
            desc = data.entries[i].value.toString()
            break
          case key == 'media':
            med = data.entries[i].value.toString()
            break
          case key == 'owner_id':
            own = data.entries[i].value.toString()
            break
          case key == 'title':
            tit = data.entries[i].value.toString()
            break
          case key == 'token_id':
            tokID = data.entries[i].value.toString()
        }
      }
    }
    let minter = Minter.load('Minter')
    if(minter == null){
      minter = new Minter('Minter')
      minter.contract = ""
      minter.collectionCount = BigInt.fromI32(0)
      minter.tokenCount = BigInt.fromI32(0)
    }
    let collection = Collection.load(colID)
    if(collection == null){
      collection = new Collection(colID)
      collection.collectionID = BigInt.fromString(colID)
    }
    let token = Token.load(tokID)
    if(token == null){
      token = new Token(tokID)
      token.contract = cont
      token.tokenId = BigInt.fromString(tokID)
      token.owner_id = own
      token.title = tit
      token.description = desc
      token.media = med
      token.creator = crea
      token.collectionID = BigInt.fromString(colID)
      token.price = "0"
      token.onSale = false
      token.extra = ""
      token.approvalID = BigInt.fromI32(0)
      token.timestamp = BigInt.fromString(blockHeader.timestampNanosec.toString())
      minter.contract = cont
      minter.tokenCount = minter.tokenCount + BigInt.fromI32(1)
      collection.tokenCount = collection.tokenCount + BigInt.fromI32(1)
      minter.save()
      token.save()
      collection.save()
      log.info("se guardo el token",[])  
    }
    log.info("El token ya esta registrado en una coleccion",[])
  }


  //Editar coleccion
  if(functionCall.methodName == "edit_collection"){
    log.info('Entro a crear coleccion',[])
    // log.info("Log: {}",[outcome.logs[0]])
    let jsonData = outcome.logs[0]
    let parsedJSON = json.fromString(jsonData)
    let colID = ""
    let desc = ""
    let medBan = ""
    let medIcon =""
    let own = ""
    let tit = ""
    let vis = false
    if(parsedJSON.kind == JSONValueKind.OBJECT){
      let entry = parsedJSON.toObject()
      let data = entry.entries[0].value.toObject()
      for(let i = 0;i < data.entries.length; i++){
        let key = data.entries[i].key.toString()
        log.info("key: {}",[key])
        switch(true){
          case key == 'collection_id':
            colID = data.entries[i].value.toString()
            break
          case key == 'description':
            desc = data.entries[i].value.toString()
            break
          case key == 'media_banner':
            medBan = data.entries[i].value.toString()
            break
          case key == 'media_icon':
            medIcon = data.entries[i].value.toString()
            break
          case key == 'owner_id':
            own = data.entries[i].value.toString()
            break
          case key == 'title':
            tit = data.entries[i].value.toString()
            break
          case key == 'visibility':
            vis = data.entries[i].value.toBool()
            break
        }
      }
    }
    let coleccion = Collection.load(colID)
    if(coleccion == null){
      coleccion = new Collection(colID)
      coleccion.collectionID = BigInt.fromString(colID)
      coleccion.owner_id = own
      coleccion.title = tit
      coleccion.description = desc
      coleccion.mediaBanner = medBan
      coleccion.mediaIcon = medIcon
      coleccion.tokenCount = BigInt.fromI32(0)
      coleccion.saleVolume = BigDecimal.fromString('0')
      coleccion.salesCount = BigInt.fromI32(0)
      coleccion.timestamp = BigInt.fromString(blockHeader.timestampNanosec.toString())
    }
    //let coleccion = new Collection(colID)
    coleccion.collectionID = BigInt.fromString(colID)
    coleccion.owner_id = own
    coleccion.title = tit
    coleccion.description = desc
    coleccion.mediaBanner = medBan
    coleccion.mediaIcon = medIcon
    coleccion.visibility = vis
    coleccion.save()
    log.info("se edito la coleccion",[])
  }

  //Preguntar para que es el nft_transfer_payout

  //Funciones del Market
  // if(functionCall.methodName == "nft_on_approve"){
  //   log.info("Log: {}",[outcome.logs[0]])
  //   log.info('entro a listado',[])
  //   let jsonData = outcome.logs[0]
  //   let parsedJSON = json.fromString(jsonData)
  //   let app = ""
  //   let cre = ""
  //   let desc = ""
  //   let st = ""
  //   let med = ""
  //   let cont = ""
  //   let own = ""
  //   let pri = ""
  //   let tit = ""
  //   let tid = ""
  //   if(parsedJSON.kind == JSONValueKind.OBJECT){
  //     let entry = parsedJSON.toObject()
  //     let params = entry.entries[0].value.toObject()
  //     for(let i = 0;i < params.entries.length; i++){
  //       let key = params.entries[i].key.toString()
  //       switch(true){
  //         case key == 'approval_id':
  //           app = params.entries[i].value.toI64().toString()
  //           break
  //         case key == 'creator_id':
  //           cre = params.entries[i].value.toString()
  //           break
  //         case key == 'description':
  //           desc = params.entries[i].value.toString()
  //           break
  //         case key == 'is_auction':
  //           if(params.entries[i].value.toBool()){
  //             st = "on_auction"
  //           }
  //           else{
  //             st = "on_sale"
  //           }
  //           break
  //         case key == 'media':
  //           med = params.entries[i].value.toString()
  //           break
  //         case key == 'nft_contract_id':
  //           cont = params.entries[i].value.toString()
  //           break
  //         case key == 'owner_id':
  //           own = params.entries[i].value.toString()
  //           break
  //         case key == 'price':
  //           pri = params.entries[i].value.toString()
  //           break
  //         case key == 'title':
  //           tit = params.entries[i].value.toString()
  //           break
  //         case key == 'token_id':
  //           tid = params.entries[i].value.toString()
  //           break
  //       }
  //     }
  //   }
  //   let token = new Token(tid+'-'+cont)//TokenID-Contract
  //   let contract = Contract.load(cont)
  //   if(contract==null){
  //     contract = new Contract(cont)//Contract
  //     contract.contractID = cont
  //     contract.tokenCount = BigInt.fromI64(0)
  //   }
  //   token.contract = cont
  //   token.tokenId = BigInt.fromString(tid)
  //   token.owner_id = own
  //   token.title = tit
  //   token.description = desc
  //   token.media = med
  //   token.creator = cre
  //   token.price = bigInt.fromString(pri)
  //   token.status = st
  //   token.extra = ""
  //   token.approvalID = BigInt.fromString(app)
  //   contract.save()
  //   token.save()
  //   log.info("se guardo el token",[])
  // }

  if(functionCall.methodName == "update_price"){
    log.info("Log: {}",[outcome.logs[0]])
    log.info('entro a actualizar precio',[])
  }

  if(functionCall.methodName == "nft_on_revoke"){
    log.info("Log: {}",[outcome.logs[0]])
    log.info('entro a quitar del listado',[])
  }
  // if(functionCall.methodName == "add_user_collection"){
  //   log.info('entro a agregar coleccion',[])
  //   let jsonData = outcome.logs[0]
  //   let parsedJSON = json.fromString(jsonData)
  //   let colID = "0"
  //   let contAdd = ""
  //   let owner = ""
  //   let title = ""
  //   let desc = ""
  //   let mediaIcon = ""
  //   let mediaBann = ""
  //   if(parsedJSON.kind == JSONValueKind.OBJECT){
  //     let entry = parsedJSON.toObject()
  //     for(let i = 0;i < entry.entries.length; i++){
  //       let key = entry.entries[i].key.toString()
  //       log.info('key:{} value:{}',[key,entry.entries[i].value.toString()])
  //       switch(true){
  //         case key == 'collection_num':
  //           colID = entry.entries[i].value.toString()
  //           break
  //         case key == 'contract_address':
  //           contAdd = entry.entries[i].value.toString()
  //           break
  //         case key == 'owner_id':
  //           owner = entry.entries[i].value.toString()
  //           break
  //         case key == 'title':
  //           title = entry.entries[i].value.toString()
  //           break
  //         case key == 'description':
  //           desc = entry.entries[i].value.toString()
  //           break
  //         case key == 'icon_media':
  //           mediaIcon = entry.entries[i].value.toString()
  //           break
  //         case key == 'banner_media':
  //           mediaBann = entry.entries[i].value.toString()
  //           break
  //       }
  //     }
  //   }
  //   //let data = outcome.logs[0].split(',')
  //   let collection = new Collection(colID+'-'+contAdd)//collectionID-contractID-owner
  //   let contract = Contract.load(contAdd)
  //   if(contract == null){
  //     contract = new Contract(contAdd)
  //     contract.owner = owner
  //     contract.contractID = contAdd
  //     contract.tokenCount = BigInt.fromI32(0)
  //     contract.collectionCount = BigInt.fromI32(0)
  //     contract.collections = []
  //   }
  //   collection.contract = contAdd
  //   collection.owner = owner
  //   collection.title = title
  //   collection.description = desc
  //   collection.tokenCount = BigInt.fromI32(0)
  //   collection.saleCount = BigInt.fromI32(0)
  //   collection.saleVolume = BigDecimal.zero()
  //   collection.mediaIcon = mediaIcon
  //   collection.mediaBanner = mediaBann
  //   collection.collectionID = BigInt.fromString(colID)
  //   collection.tokens = []
  //   contract.collectionCount = contract.collectionCount + BigInt.fromI32(1)
  //   contract.collections.push(colID+'-'+contAdd)
  //   contract.save()
  //   collection.save()
  //   log.info('se guardo la coleccion',[])
  // }

  // if (functionCall.methodName == "save_mint_ttg") {
  //   log.info("Entro a minar", [])
  //   let jsonData = outcome.logs[0]
  //   let parsedJSON = json.fromString(jsonData)
  //   let contAdd = ""
  //   let colName = ""
  //   let colID = ""
  //   let tokID = ""
  //   let owner = ""
  //   let title = ""
  //   let desc = ""
  //   let media = ""
  //   let creator = ""
  //   let price = ""
  //   let status = ""
  //   let addBid = ""
  //   let highBid = ""
  //   let lowBid = ""
  //   let expires = ""
  //   let starts = ""
  //   let extra = ""
  //   if(parsedJSON.kind == JSONValueKind.OBJECT){
  //     let entry = parsedJSON.toObject()
  //     for(let i = 0;i < entry.entries.length; i++){
  //       let key = entry.entries[i].key.toString()
  //       let value = entry.entries[i].value.toString()
  //       log.info('key:{} value:{}',[key,value])
  //       switch(true){
  //         case key == 'contract_name':
  //           contAdd = value
  //           break
  //         case key == 'collection':
  //           colName = value
  //           break
  //         case key == 'collection_id':
  //           colID = value
  //           break
  //         case key == 'token_id':
  //           tokID = value
  //           break
  //         case key == 'owner_id':
  //           owner = value
  //           break
  //         case key == 'title':
  //           title = value
  //           break
  //         case key == 'description':
  //           desc = value
  //           break
  //         case key == 'media':
  //           media = value
  //           break
  //         case key == 'creator':
  //           creator = value
  //           break
  //         case key == 'price':
  //           price = value
  //           break
  //         case key == 'status':
  //           status = value
  //           break
  //         case key == 'adressbidder':
  //           addBid = value
  //           break
  //         case key == 'highestbid':
  //           highBid = value
  //           break
  //         case key == 'lowestbid':
  //           lowBid = value
  //           break
  //         case key == 'expires_at':
  //           expires = value
  //           break
  //         case key == 'starts_at':
  //           starts = value
  //           break
  //         case key == 'extra':
  //           extra = value
  //           break
  //       }
  //     }
  //   }
  //   log.info("Log: {}",[outcome.logs[0]])
  //   let token = new Token(tokID + '-' + creator + '-' + contAdd);//tokenId-Creator-Collection
  //   let collection= Collection.load(colID+'-'+contAdd)
  //   let contract = Contract.load(contAdd)
  //   if(collection == null) {
  //     log.info("No se encontro la coleccion", [])
  //     collection = new Collection(colID+'-'+contAdd)
  //     collection.title = colName
  //     collection.tokenCount = BigInt.fromI32(0)
  //     collection.saleCount = BigInt.fromI32(0)
  //     collection.saleVolume = BigDecimal.zero()
  //     collection.collectionID = bigInt.fromString(colID)
  //     collection.tokens = []
  //     collection.owner = owner
  //     collection.contract = contAdd
  //   }
  //   if(contract == null){
  //     log.info('No se encontro el contrato',[])
  //     contract = new Contract(contAdd)
  //     contract.contractID = contAdd
  //     contract.owner =owner
  //     contract.tokenCount = BigInt.fromI32(0)
  //     contract.collectionCount = BigInt.fromI32(1)
  //     contract.collections = []
  //     contract.collections.push(colID+'-'+contAdd)
  //   }
  //   token.collection = colName
  //   token.collectionID = BigInt.fromString(colID)
  //   token.contract = contAdd
  //   token.tokenId = BigInt.fromString(tokID);
  //   token.owner_id = owner;
  //   token.title = title;
  //   token.description = desc;
  //   token.media = media;
  //   token.creator = creator;
  //   token.price = BigInt.fromString(price);
  //   token.status = status;
  //   token.adressbidder = addBid;
  //   token.highestbidder = highBid;
  //   token.lowestbidder = lowBid;
  //   token.expires_at = expires;
  //   token.starts_at = starts;
  //   token.extra = extra;
  //   collection.tokens.push(tokID + '-' + creator + '-' + contAdd)
  //   collection.tokenCount = collection.tokenCount + BigInt.fromI32(1);
  //   contract.tokenCount = contract.tokenCount + BigInt.fromI32(1);
  //   contract.save()
  //   collection.save()
  //   token.save()
  //   log.info("Se guardo el NFT", [])
  // }

  // if (functionCall.methodName == "save_buy_ttg"){
  //   log.info("Entro en compra", [])
  //   let jsonData = outcome.logs[0]
  //   let parsedJSON = json.fromString(jsonData)
  //   let contAdd = ""
  //   let colName = ""
  //   let colID = ""
  //   let tokID = ""
  //   let owner = ""
  //   let title = ""
  //   let desc = ""
  //   let media = ""
  //   let creator = ""
  //   let price = ""
  //   let status = ""
  //   let addBid = ""
  //   let highBid = ""
  //   let lowBid = ""
  //   let expires = ""
  //   let starts = ""
  //   let extra = ""
  //   if(parsedJSON.kind == JSONValueKind.OBJECT){
  //     let entry = parsedJSON.toObject()
  //     for(let i = 0;i < entry.entries.length; i++){
  //       let key = entry.entries[i].key.toString()
  //       let value = entry.entries[i].value.toString()
  //       log.info('key:{} value:{}',[key,value])
  //       switch(true){
  //         case key == 'contract_name':
  //           contAdd = value
  //           break
  //         case key == 'collection':
  //           colName = value
  //           break
  //         case key == 'collection_id':
  //           colID = value
  //           break
  //         case key == 'token_id':
  //           tokID = value
  //           break
  //         case key == 'owner_id':
  //           owner = value
  //           break
  //         case key == 'title':
  //           title = value
  //           break
  //         case key == 'description':
  //           desc = value
  //           break
  //         case key == 'media':
  //           media = value
  //           break
  //         case key == 'creator':
  //           creator = value
  //           break
  //         case key == 'price':
  //           price = value
  //           break
  //         case key == 'status':
  //           status = value
  //           break
  //         case key == 'adressbidder':
  //           addBid = value
  //           break
  //         case key == 'highestbid':
  //           highBid = value
  //           break
  //         case key == 'lowestbid':
  //           lowBid = value
  //           break
  //         case key == 'expires_at':
  //           expires = value
  //           break
  //         case key == 'starts_at':
  //           starts = value
  //           break
  //         case key == 'extra':
  //           extra = value
  //           break
  //       }
  //     }
  //   }
  //   log.info("Log: {}",[outcome.logs[0]])
  //   let token = Token.load(tokID + '-' + creator + '-' + contAdd)
  //   let collection= Collection.load(colID+'-'+contAdd)
  //   if(token == null){
  //     log.info("No se encontro el token",[])
  //     token = new Token(tokID + '-' + creator + '-' + contAdd)
  //     token.collection = colName
  //     token.collectionID = BigInt.fromString(colID)
  //     token.contract = contAdd
  //     token.tokenId = BigInt.fromString(tokID);
  //     token.owner_id = owner;
  //     token.title = title;
  //     token.description = desc;
  //     token.media = media;
  //     token.creator = creator;
  //     token.price = BigInt.fromString(price);
  //     token.status = status;
  //     token.adressbidder = addBid;
  //     token.highestbidder = highBid;
  //     token.lowestbidder = lowBid;
  //     token.expires_at = expires;
  //     token.starts_at = starts;
  //     token.extra = extra;
  //   }
  //   if(collection == null) {
  //     log.info("No se encontro la coleccion", [])
  //     collection = new Collection(colID+'-'+contAdd)
  //     collection.title = title
  //     collection.tokenCount = BigInt.fromI32(0)
  //     collection.saleCount = BigInt.fromI32(0)
  //     collection.saleVolume = BigDecimal.zero()
  //     collection.tokens = []
  //     collection.owner = owner
  //     collection.collectionID = BigInt.fromString(colID)
  //     collection.contract = contAdd
  //   }
  //   token.status = status
  //   token.owner_id = owner
  //   collection.saleCount = collection.saleCount + BigInt.fromI32(1)
  //   collection.saleVolume = collection.saleVolume + BigDecimal.fromString(price)
  //   token.save()
  //   collection.save()
  //   log.info("se compro un NFT",[])
  // }
  
  // if (functionCall.methodName == "save_remove_ttg"){
  //   log.info("Entro en quitar de la venta", [])
  //   let jsonData = outcome.logs[0]
  //   let parsedJSON = json.fromString(jsonData)
  //   let contAdd = ""
  //   let colName = ""
  //   let colID = ""
  //   let tokID = ""
  //   let owner = ""
  //   let title = ""
  //   let desc = ""
  //   let media = ""
  //   let creator = ""
  //   let price = ""
  //   let status = ""
  //   let addBid = ""
  //   let highBid = ""
  //   let lowBid = ""
  //   let expires = ""
  //   let starts = ""
  //   let extra = ""
  //   if(parsedJSON.kind == JSONValueKind.OBJECT){
  //     let entry = parsedJSON.toObject()
  //     for(let i = 0;i < entry.entries.length; i++){
  //       let key = entry.entries[i].key.toString()
  //       let value = entry.entries[i].value.toString()
  //       log.info('key:{} value:{}',[key,value])
  //       switch(true){
  //         case key == 'contract_name':
  //           contAdd = value
  //           break
  //         case key == 'collection':
  //           colName = value
  //           break
  //         case key == 'collection_id':
  //           colID = value
  //           break
  //         case key == 'token_id':
  //           tokID = value
  //           break
  //         case key == 'owner_id':
  //           owner = value
  //           break
  //         case key == 'title':
  //           title = value
  //           break
  //         case key == 'description':
  //           desc = value
  //           break
  //         case key == 'media':
  //           media = value
  //           break
  //         case key == 'creator':
  //           creator = value
  //           break
  //         case key == 'price':
  //           price = value
  //           break
  //         case key == 'status':
  //           status = value
  //           break
  //         case key == 'adressbidder':
  //           addBid = value
  //           break
  //         case key == 'highestbid':
  //           highBid = value
  //           break
  //         case key == 'lowestbid':
  //           lowBid = value
  //           break
  //         case key == 'expires_at':
  //           expires = value
  //           break
  //         case key == 'starts_at':
  //           starts = value
  //           break
  //         case key == 'extra':
  //           extra = value
  //           break
  //       }
  //     }
  //   }
  //   log.info("Log: {}",[outcome.logs[0]])
  //   let token = Token.load(tokID + '-' + creator + '-' + contAdd)
  //   if(token==null){
  //     log.info("No se encontro el token",[])
  //     token = new Token(tokID + '-' + creator + '-' + contAdd)
  //     token.collection = colName
  //     token.collectionID = BigInt.fromString(colID)
  //     token.contract = contAdd
  //     token.tokenId = BigInt.fromString(tokID);
  //     token.owner_id = owner;
  //     token.title = title;
  //     token.description = desc;
  //     token.media = media;
  //     token.creator = creator;
  //     token.price = BigInt.fromString(price);
  //     token.status = status;
  //     token.adressbidder = addBid;
  //     token.highestbidder = highBid;
  //     token.lowestbidder = lowBid;
  //     token.expires_at = expires;
  //     token.starts_at = starts;
  //     token.extra = extra;
  //   }
  //   token.status = status
  //   token.save()
  //   log.info("se quito de la venta un NFT",[])
  // }

  // if (functionCall.methodName == "save_sell_ttg"){
  //   log.info("Entro en vender", [])
  //   let jsonData = outcome.logs[0]
  //   let parsedJSON = json.fromString(jsonData)
  //   let contAdd = ""
  //   let colName = ""
  //   let colID = ""
  //   let tokID = ""
  //   let owner = ""
  //   let title = ""
  //   let desc = ""
  //   let media = ""
  //   let creator = ""
  //   let price = ""
  //   let status = ""
  //   let addBid = ""
  //   let highBid = ""
  //   let lowBid = ""
  //   let expires = ""
  //   let starts = ""
  //   let extra = ""
  //   if(parsedJSON.kind == JSONValueKind.OBJECT){
  //     let entry = parsedJSON.toObject()
  //     for(let i = 0;i < entry.entries.length; i++){
  //       let key = entry.entries[i].key.toString()
  //       let value = entry.entries[i].value.toString()
  //       log.info('key:{} value:{}',[key,value])
  //       switch(true){
  //         case key == 'contract_name':
  //           contAdd = value
  //           break
  //         case key == 'collection':
  //           colName = value
  //           break
  //         case key == 'collection_id':
  //           colID = value
  //           break
  //         case key == 'token_id':
  //           tokID = value
  //           break
  //         case key == 'owner_id':
  //           owner = value
  //           break
  //         case key == 'title':
  //           title = value
  //           break
  //         case key == 'description':
  //           desc = value
  //           break
  //         case key == 'media':
  //           media = value
  //           break
  //         case key == 'creator':
  //           creator = value
  //           break
  //         case key == 'price':
  //           price = value
  //           break
  //         case key == 'status':
  //           status = value
  //           break
  //         case key == 'adressbidder':
  //           addBid = value
  //           break
  //         case key == 'highestbid':
  //           highBid = value
  //           break
  //         case key == 'lowestbid':
  //           lowBid = value
  //           break
  //         case key == 'expires_at':
  //           expires = value
  //           break
  //         case key == 'starts_at':
  //           starts = value
  //           break
  //         case key == 'extra':
  //           extra = value
  //           break
  //       }
  //     }
  //   }
  //   log.info("Log: {}",[outcome.logs[0]])
  //   let token = Token.load(tokID + '-' + creator + '-' + contAdd)
  //   if(token==null){
  //     log.info("No se encontro el token",[])
  //     token = new Token(tokID + '-' + creator + '-' + contAdd)
  //     token.collection = colName
  //     token.collectionID = BigInt.fromString(colID)
  //     token.contract = contAdd
  //     token.tokenId = BigInt.fromString(tokID);
  //     token.owner_id = owner;
  //     token.title = title;
  //     token.description = desc;
  //     token.media = media;
  //     token.creator = creator;
  //     token.price = BigInt.fromString(price);
  //     token.status = status;
  //     token.adressbidder = addBid;
  //     token.highestbidder = highBid;
  //     token.lowestbidder = lowBid;
  //     token.expires_at = expires;
  //     token.starts_at = starts;
  //     token.extra = extra;
  //   }
  //   token.status = status
  //   token.price = BigInt.fromString(price)
  //   token.save()
  //   log.info("se puso a la venta un NFT",[])
  // }
}