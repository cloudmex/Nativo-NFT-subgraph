// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Profile extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("username", Value.fromString(""));
    this.set("media", Value.fromString(""));
    this.set("biography", Value.fromString(""));
    this.set("tokCreated", Value.fromBigInt(BigInt.zero()));
    this.set("tokBought", Value.fromBigInt(BigInt.zero()));
    this.set("socialMedia", Value.fromString(""));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Profile entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Profile entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Profile", id.toString(), this);
    }
  }

  static load(id: string): Profile | null {
    return changetype<Profile | null>(store.get("Profile", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get username(): string {
    let value = this.get("username");
    return value!.toString();
  }

  set username(value: string) {
    this.set("username", Value.fromString(value));
  }

  get media(): string {
    let value = this.get("media");
    return value!.toString();
  }

  set media(value: string) {
    this.set("media", Value.fromString(value));
  }

  get biography(): string {
    let value = this.get("biography");
    return value!.toString();
  }

  set biography(value: string) {
    this.set("biography", Value.fromString(value));
  }

  get tokCreated(): BigInt {
    let value = this.get("tokCreated");
    return value!.toBigInt();
  }

  set tokCreated(value: BigInt) {
    this.set("tokCreated", Value.fromBigInt(value));
  }

  get tokBought(): BigInt {
    let value = this.get("tokBought");
    return value!.toBigInt();
  }

  set tokBought(value: BigInt) {
    this.set("tokBought", Value.fromBigInt(value));
  }

  get socialMedia(): string {
    let value = this.get("socialMedia");
    return value!.toString();
  }

  set socialMedia(value: string) {
    this.set("socialMedia", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class Market extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("contract", Value.fromString(""));
    this.set("salesCount", Value.fromBigInt(BigInt.zero()));
    this.set("onSaleCount", Value.fromBigInt(BigInt.zero()));
    this.set("saleVolume", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Market entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Market entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Market", id.toString(), this);
    }
  }

  static load(id: string): Market | null {
    return changetype<Market | null>(store.get("Market", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get contract(): string {
    let value = this.get("contract");
    return value!.toString();
  }

  set contract(value: string) {
    this.set("contract", Value.fromString(value));
  }

  get salesCount(): BigInt {
    let value = this.get("salesCount");
    return value!.toBigInt();
  }

  set salesCount(value: BigInt) {
    this.set("salesCount", Value.fromBigInt(value));
  }

  get onSaleCount(): BigInt {
    let value = this.get("onSaleCount");
    return value!.toBigInt();
  }

  set onSaleCount(value: BigInt) {
    this.set("onSaleCount", Value.fromBigInt(value));
  }

  get saleVolume(): BigInt {
    let value = this.get("saleVolume");
    return value!.toBigInt();
  }

  set saleVolume(value: BigInt) {
    this.set("saleVolume", Value.fromBigInt(value));
  }
}

export class Bid extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("contract", Value.fromString(""));
    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
    this.set("bidder", Value.fromString(""));
    this.set("price", Value.fromBigInt(BigInt.zero()));
    this.set("status", Value.fromString(""));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Bid entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Bid entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Bid", id.toString(), this);
    }
  }

  static load(id: string): Bid | null {
    return changetype<Bid | null>(store.get("Bid", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get contract(): string {
    let value = this.get("contract");
    return value!.toString();
  }

  set contract(value: string) {
    this.set("contract", Value.fromString(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get bidder(): string {
    let value = this.get("bidder");
    return value!.toString();
  }

  set bidder(value: string) {
    this.set("bidder", Value.fromString(value));
  }

  get price(): BigInt {
    let value = this.get("price");
    return value!.toBigInt();
  }

  set price(value: BigInt) {
    this.set("price", Value.fromBigInt(value));
  }

  get status(): string {
    let value = this.get("status");
    return value!.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class Action extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("type", Value.fromString(""));
    this.set("data", Value.fromString(""));
    this.set("timestamp", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Action entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Action entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Action", id.toString(), this);
    }
  }

  static load(id: string): Action | null {
    return changetype<Action | null>(store.get("Action", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get data(): string {
    let value = this.get("data");
    return value!.toString();
  }

  set data(value: string) {
    this.set("data", Value.fromString(value));
  }

  get timestamp(): string {
    let value = this.get("timestamp");
    return value!.toString();
  }

  set timestamp(value: string) {
    this.set("timestamp", Value.fromString(value));
  }
}

export class Minter extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("contract", Value.fromString(""));
    this.set("tokenCount", Value.fromBigInt(BigInt.zero()));
    this.set("collectionCount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Minter entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Minter entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Minter", id.toString(), this);
    }
  }

  static load(id: string): Minter | null {
    return changetype<Minter | null>(store.get("Minter", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get contract(): string {
    let value = this.get("contract");
    return value!.toString();
  }

  set contract(value: string) {
    this.set("contract", Value.fromString(value));
  }

  get tokenCount(): BigInt {
    let value = this.get("tokenCount");
    return value!.toBigInt();
  }

  set tokenCount(value: BigInt) {
    this.set("tokenCount", Value.fromBigInt(value));
  }

  get collectionCount(): BigInt {
    let value = this.get("collectionCount");
    return value!.toBigInt();
  }

  set collectionCount(value: BigInt) {
    this.set("collectionCount", Value.fromBigInt(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("contract", Value.fromString(""));
    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
    this.set("owner_id", Value.fromString(""));
    this.set("title", Value.fromString(""));
    this.set("description", Value.fromString(""));
    this.set("media", Value.fromString(""));
    this.set("creator", Value.fromString(""));
    this.set("price", Value.fromString(""));
    this.set("onSale", Value.fromBoolean(false));
    this.set("extra", Value.fromString(""));
    this.set("approvalID", Value.fromBigInt(BigInt.zero()));
    this.set("collectionID", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Token entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Token entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Token", id.toString(), this);
    }
  }

  static load(id: string): Token | null {
    return changetype<Token | null>(store.get("Token", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get contract(): string {
    let value = this.get("contract");
    return value!.toString();
  }

  set contract(value: string) {
    this.set("contract", Value.fromString(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get owner_id(): string {
    let value = this.get("owner_id");
    return value!.toString();
  }

  set owner_id(value: string) {
    this.set("owner_id", Value.fromString(value));
  }

  get title(): string {
    let value = this.get("title");
    return value!.toString();
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get description(): string {
    let value = this.get("description");
    return value!.toString();
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get media(): string {
    let value = this.get("media");
    return value!.toString();
  }

  set media(value: string) {
    this.set("media", Value.fromString(value));
  }

  get creator(): string {
    let value = this.get("creator");
    return value!.toString();
  }

  set creator(value: string) {
    this.set("creator", Value.fromString(value));
  }

  get price(): string {
    let value = this.get("price");
    return value!.toString();
  }

  set price(value: string) {
    this.set("price", Value.fromString(value));
  }

  get onSale(): boolean {
    let value = this.get("onSale");
    return value!.toBoolean();
  }

  set onSale(value: boolean) {
    this.set("onSale", Value.fromBoolean(value));
  }

  get extra(): string {
    let value = this.get("extra");
    return value!.toString();
  }

  set extra(value: string) {
    this.set("extra", Value.fromString(value));
  }

  get approvalID(): BigInt {
    let value = this.get("approvalID");
    return value!.toBigInt();
  }

  set approvalID(value: BigInt) {
    this.set("approvalID", Value.fromBigInt(value));
  }

  get collectionID(): BigInt {
    let value = this.get("collectionID");
    return value!.toBigInt();
  }

  set collectionID(value: BigInt) {
    this.set("collectionID", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class Serie extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("title", Value.fromString(""));
    this.set("description", Value.fromString(""));
    this.set("media", Value.fromString(""));
    this.set("status", Value.fromString(""));
    this.set("creator", Value.fromString(""));
    this.set("price", Value.fromString(""));
    this.set("extra", Value.fromString(""));
    this.set("copies", Value.fromBigInt(BigInt.zero()));
    this.set("collectionID", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Serie entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Serie entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Serie", id.toString(), this);
    }
  }

  static load(id: string): Serie | null {
    return changetype<Serie | null>(store.get("Serie", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get title(): string {
    let value = this.get("title");
    return value!.toString();
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get description(): string {
    let value = this.get("description");
    return value!.toString();
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get media(): string {
    let value = this.get("media");
    return value!.toString();
  }

  set media(value: string) {
    this.set("media", Value.fromString(value));
  }

  get status(): string {
    let value = this.get("status");
    return value!.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }

  get creator(): string {
    let value = this.get("creator");
    return value!.toString();
  }

  set creator(value: string) {
    this.set("creator", Value.fromString(value));
  }

  get price(): string {
    let value = this.get("price");
    return value!.toString();
  }

  set price(value: string) {
    this.set("price", Value.fromString(value));
  }

  get extra(): string {
    let value = this.get("extra");
    return value!.toString();
  }

  set extra(value: string) {
    this.set("extra", Value.fromString(value));
  }

  get copies(): BigInt {
    let value = this.get("copies");
    return value!.toBigInt();
  }

  set copies(value: BigInt) {
    this.set("copies", Value.fromBigInt(value));
  }

  get collectionID(): BigInt {
    let value = this.get("collectionID");
    return value!.toBigInt();
  }

  set collectionID(value: BigInt) {
    this.set("collectionID", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class Collection extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("owner_id", Value.fromString(""));
    this.set("title", Value.fromString(""));
    this.set("description", Value.fromString(""));
    this.set("tokenCount", Value.fromBigInt(BigInt.zero()));
    this.set("salesCount", Value.fromBigInt(BigInt.zero()));
    this.set("saleVolume", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("mediaIcon", Value.fromString(""));
    this.set("mediaBanner", Value.fromString(""));
    this.set("collectionID", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Collection entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Collection entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Collection", id.toString(), this);
    }
  }

  static load(id: string): Collection | null {
    return changetype<Collection | null>(store.get("Collection", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner_id(): string {
    let value = this.get("owner_id");
    return value!.toString();
  }

  set owner_id(value: string) {
    this.set("owner_id", Value.fromString(value));
  }

  get title(): string {
    let value = this.get("title");
    return value!.toString();
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get description(): string {
    let value = this.get("description");
    return value!.toString();
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get tokenCount(): BigInt {
    let value = this.get("tokenCount");
    return value!.toBigInt();
  }

  set tokenCount(value: BigInt) {
    this.set("tokenCount", Value.fromBigInt(value));
  }

  get salesCount(): BigInt {
    let value = this.get("salesCount");
    return value!.toBigInt();
  }

  set salesCount(value: BigInt) {
    this.set("salesCount", Value.fromBigInt(value));
  }

  get saleVolume(): BigDecimal {
    let value = this.get("saleVolume");
    return value!.toBigDecimal();
  }

  set saleVolume(value: BigDecimal) {
    this.set("saleVolume", Value.fromBigDecimal(value));
  }

  get mediaIcon(): string {
    let value = this.get("mediaIcon");
    return value!.toString();
  }

  set mediaIcon(value: string) {
    this.set("mediaIcon", Value.fromString(value));
  }

  get mediaBanner(): string {
    let value = this.get("mediaBanner");
    return value!.toString();
  }

  set mediaBanner(value: string) {
    this.set("mediaBanner", Value.fromString(value));
  }

  get collectionID(): BigInt {
    let value = this.get("collectionID");
    return value!.toBigInt();
  }

  set collectionID(value: BigInt) {
    this.set("collectionID", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}
