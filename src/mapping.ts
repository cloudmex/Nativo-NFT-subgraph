import { near, BigInt, log, BigDecimal, json, JSONValueKind, bigInt, JSONValue,} from "@graphprotocol/graph-ts"
import { Minter, Market, Profile, Token, Bid, Action, Collection, Serie, Notification } from "../generated/schema"

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
  }

  if(functionCall.methodName == "nft_transfer"){
    let outcomeLog = outcome.logs[0]
    let parsedLog = outcomeLog.replace('EVENT_JSON:', '')
    let jsonData = json.try_fromString(parsedLog)
    let jsonObj = jsonData.value.toObject()
    let eventData = jsonObj.get('data')
    if(eventData){
      let eventArray:JSONValue[] = eventData.toArray()
      let data = eventArray[0].toObject()
      //Parseo de la info de las notificaciones
      let event = jsonObj.get('event')
      let old_owner = data.get('old_owner_id')
      let new_owner = data.get('new_owner_id')
      let token_id = ''
      let idData = data.get('token_ids')
      if (idData){
        let idArray:JSONValue[] = idData.toArray()  
        token_id=idArray[0].toString()
      }
      if(!event || !old_owner || !new_owner || token_id=='') return
      //Transferiste un NFT
      let transfered = new Notification(outcome.id.toString()+'-'+old_owner.toString())
      transfered.event = event.toString()
      transfered.data = eventArray[0].toString()
      transfered.owner = old_owner.toString()
      transfered.timestamp = BigInt.fromI64(blockHeader.timestampNanosec)
      //recibiste un NFT
      let received = new Notification(outcome.id.toString()+'-'+new_owner.toString())
      received.event = event.toString()
      received.data = eventArray[0].toString()
      received.owner = old_owner.toString()
      received.timestamp = BigInt.fromI64(blockHeader.timestampNanosec)
      transfered.save()
      received.save()
    }
    
    
  }

  if(functionCall.methodName == "add_new_profile"){
    log.info('Entro a info_perfil',[])
    log.info("Log: {}",[outcome.logs[0]])
    let jsonData = outcome.logs[0]
    let parsedJSON = json.fromString(jsonData)
    let acc = ""
    let med = ""
    let bio = ""
    let socMed = ""
    let type =""
    let medBan = ""
    if(parsedJSON.kind == JSONValueKind.OBJECT){
      let entry = parsedJSON.toObject()
      let data = entry.entries[0].value.toObject()
      type = entry.entries[1].value.toString()
      for(let i = 0;i < data.entries.length; i++){
        let key = data.entries[i].key.toString()
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
          case key == 'media_banner':
            medBan == data.entries[i].value.toString()
        }
      }
    }
    if(type == "create"){
      let minter = Minter.load('Minter')
      if(minter == null){
        minter = new Minter('Minter')
        minter.contract = ""
        minter.collectionCount = BigInt.fromI32(0)
        minter.tokenCount = BigInt.fromI32(0)
        minter.profileCount = BigInt.fromI32(0)
      }
      let profile = Profile.load(acc)
      if(profile==null){
        profile = new Profile(acc)
        profile.username = acc
        profile.biography = bio
        profile.socialMedia = socMed
        profile.media = med
        profile.mediaBanner = medBan
        profile.tokBought = BigInt.fromI64(0)
        profile.tokCreated = BigInt.fromI64(0)
        profile.timestamp = BigInt.fromString(blockHeader.timestampNanosec.toString())
        minter.profileCount = minter.profileCount + BigInt.fromI32(1)
        profile.save()
        minter.save()
        log.info("se guardo el perfil",[])
      }
      log.info("perfil ya creado",[])
    }
    if(type == "edit"){
      let profile = Profile.load(acc)
      if(profile==null){
        profile = new Profile(acc)
        profile.username = acc
        profile.biography = bio
        profile.socialMedia = socMed
        profile.media = med
        profile.mediaBanner = medBan
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
    //log.info('Entro a crear/editar coleccion',[])
    // log.info("Log: {}",[outcome.logs[0]])
    let jsonData = outcome.logs[0]
    let parsedJSON = json.fromString(jsonData)
    let colID = ""
    let desc = ""
    let medBan = ""
    let medIcon =""
    let own = ""
    let tit = ""
    let type = ""
    let vis = true
    let twit = ""
    let web = ""
    if(parsedJSON.kind == JSONValueKind.OBJECT){
      let entry = parsedJSON.toObject()
      let data = entry.entries[0].value.toObject()
      type = entry.entries[1].value.toString()
      for(let i = 0;i < data.entries.length; i++){
        let key = data.entries[i].key.toString()
        switch(true){
          case key == 'collection_id':
            colID = data.entries[i].value.toI64().toString()
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
          case key == 'twitter':
            twit = data.entries[i].value.toString()
            break
          case key == 'website':
            web = data.entries[i].value.toString()
            break
        }
      }
    }
    if(type == "create"){
     // log.info('Entro a crear',[])
      let minter = Minter.load('Minter')
      if(minter == null){
        minter = new Minter('Minter')
        minter.contract = ""
        minter.collectionCount = BigInt.fromI32(0)
        minter.tokenCount = BigInt.fromI32(0)
        minter.profileCount = BigInt.fromI32(0)
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
      coleccion.visibility = vis
      coleccion.twitter = twit
      coleccion.website = web
      minter.collectionCount = minter.collectionCount + BigInt.fromI32(1)
      minter.save()
      coleccion.save()
      //log.info("se guardo la coleccion",[])
    }
    if(type == "new_collection"){
      //log.info('Entro a crear',[])
      let minter = Minter.load('Minter')
      if(minter == null){
        minter = new Minter('Minter')
        minter.contract = ""
        minter.collectionCount = BigInt.fromI32(0)
        minter.tokenCount = BigInt.fromI32(0)
        minter.profileCount = BigInt.fromI32(0)
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
      coleccion.visibility = vis
      coleccion.twitter = twit
      coleccion.website = web
      minter.collectionCount = minter.collectionCount + BigInt.fromI32(1)
      minter.save()
      coleccion.save()
      //log.info("se guardo la coleccion",[])
    }
    else if(type == "edit"){
      //log.info('Entro a editar',[])
      //log.info('colID: {}',[colID])
      let coleccion = Collection.load(colID)
      if(coleccion == null){
        coleccion = new Collection(colID)
        //log.info('No se encontro la coleccion',[])
        coleccion.title = tit
        coleccion.description = desc
        coleccion.mediaBanner = medBan
        coleccion.mediaIcon = medIcon
        coleccion.visibility = vis
        coleccion.twitter = twit
        coleccion.website = web
      }
      coleccion.title = tit
      coleccion.description = desc
      coleccion.mediaBanner = medBan
      coleccion.mediaIcon = medIcon
      coleccion.visibility = vis
      coleccion.twitter = twit
      coleccion.website = web
      coleccion.save()
      //log.info("se edito la coleccion",[])
    }
    
  }

  //Agregar un NFT a una coleccion
  if(functionCall.methodName == "add_token_to_collection"){
    //log.info('Entro a agregar token',[])
    //log.info('Receiver ID: {}',[receipt.receiverId])
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
        switch(true){
          case key == 'collection_id':
            colID = data.entries[i].value.toU64().toString()
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
      minter.profileCount = BigInt.fromI32(0)
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
      //log.info("se guardo el token",[])  
    }
    //log.info("El token ya esta registrado en una coleccion",[])
  }


  //Editar coleccion
  if(functionCall.methodName == "edit_collection"){
    //log.info('Entro a crear coleccion',[])
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
        //log.info("key: {}",[key])
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
    //log.info("se edito la coleccion",[])
  }

  if(functionCall.methodName == "update_price"){
   // log.info("Log: {}",[outcome.logs[0]])
   // log.info('entro a actualizar precio',[])
  }

  if(functionCall.methodName == "nft_on_revoke"){
    //log.info("Log: {}",[outcome.logs[0]])
    //log.info('entro a quitar del listado',[])
  }
}