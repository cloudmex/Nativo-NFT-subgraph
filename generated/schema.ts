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

export class Market extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("contractCount", Value.fromBigInt(BigInt.zero()));
    this.set("contracts", Value.fromStringArray(new Array(0)));
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

  get contractCount(): BigInt {
    let value = this.get("contractCount");
    return value!.toBigInt();
  }

  set contractCount(value: BigInt) {
    this.set("contractCount", Value.fromBigInt(value));
  }

  get contracts(): Array<string> {
    let value = this.get("contracts");
    return value!.toStringArray();
  }

  set contracts(value: Array<string>) {
    this.set("contracts", Value.fromStringArray(value));
  }
}

export class Contract extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("owner", Value.fromString(""));
    this.set("contractID", Value.fromString(""));
    this.set("tokenCount", Value.fromBigInt(BigInt.zero()));
    this.set("collectionCount", Value.fromBigInt(BigInt.zero()));
    this.set("factory", Value.fromString(""));
    this.set("collections", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Contract entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Contract entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Contract", id.toString(), this);
    }
  }

  static load(id: string): Contract | null {
    return changetype<Contract | null>(store.get("Contract", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get contractID(): string {
    let value = this.get("contractID");
    return value!.toString();
  }

  set contractID(value: string) {
    this.set("contractID", Value.fromString(value));
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

  get factory(): string {
    let value = this.get("factory");
    return value!.toString();
  }

  set factory(value: string) {
    this.set("factory", Value.fromString(value));
  }

  get collections(): Array<string> {
    let value = this.get("collections");
    return value!.toStringArray();
  }

  set collections(value: Array<string>) {
    this.set("collections", Value.fromStringArray(value));
  }
}

export class Collection extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("contract", Value.fromString(""));
    this.set("owner", Value.fromString(""));
    this.set("title", Value.fromString(""));
    this.set("description", Value.fromString(""));
    this.set("tokenCount", Value.fromBigInt(BigInt.zero()));
    this.set("saleCount", Value.fromBigInt(BigInt.zero()));
    this.set("saleVolume", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("mediaIcon", Value.fromString(""));
    this.set("mediaBanner", Value.fromString(""));
    this.set("collectionID", Value.fromBigInt(BigInt.zero()));
    this.set("tokens", Value.fromStringArray(new Array(0)));
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

  get contract(): string {
    let value = this.get("contract");
    return value!.toString();
  }

  set contract(value: string) {
    this.set("contract", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
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

  get saleCount(): BigInt {
    let value = this.get("saleCount");
    return value!.toBigInt();
  }

  set saleCount(value: BigInt) {
    this.set("saleCount", Value.fromBigInt(value));
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

  get tokens(): Array<string> {
    let value = this.get("tokens");
    return value!.toStringArray();
  }

  set tokens(value: Array<string>) {
    this.set("tokens", Value.fromStringArray(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("collection", Value.fromString(""));
    this.set("collectionID", Value.fromBigInt(BigInt.zero()));
    this.set("contract", Value.fromString(""));
    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
    this.set("owner_id", Value.fromString(""));
    this.set("title", Value.fromString(""));
    this.set("description", Value.fromString(""));
    this.set("media", Value.fromString(""));
    this.set("creator", Value.fromString(""));
    this.set("price", Value.fromBigInt(BigInt.zero()));
    this.set("status", Value.fromString(""));
    this.set("adressbidder", Value.fromString(""));
    this.set("highestbidder", Value.fromString(""));
    this.set("lowestbidder", Value.fromString(""));
    this.set("expires_at", Value.fromString(""));
    this.set("starts_at", Value.fromString(""));
    this.set("extra", Value.fromString(""));
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

  get collection(): string {
    let value = this.get("collection");
    return value!.toString();
  }

  set collection(value: string) {
    this.set("collection", Value.fromString(value));
  }

  get collectionID(): BigInt {
    let value = this.get("collectionID");
    return value!.toBigInt();
  }

  set collectionID(value: BigInt) {
    this.set("collectionID", Value.fromBigInt(value));
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

  get adressbidder(): string {
    let value = this.get("adressbidder");
    return value!.toString();
  }

  set adressbidder(value: string) {
    this.set("adressbidder", Value.fromString(value));
  }

  get highestbidder(): string {
    let value = this.get("highestbidder");
    return value!.toString();
  }

  set highestbidder(value: string) {
    this.set("highestbidder", Value.fromString(value));
  }

  get lowestbidder(): string {
    let value = this.get("lowestbidder");
    return value!.toString();
  }

  set lowestbidder(value: string) {
    this.set("lowestbidder", Value.fromString(value));
  }

  get expires_at(): string {
    let value = this.get("expires_at");
    return value!.toString();
  }

  set expires_at(value: string) {
    this.set("expires_at", Value.fromString(value));
  }

  get starts_at(): string {
    let value = this.get("starts_at");
    return value!.toString();
  }

  set starts_at(value: string) {
    this.set("starts_at", Value.fromString(value));
  }

  get extra(): string {
    let value = this.get("extra");
    return value!.toString();
  }

  set extra(value: string) {
    this.set("extra", Value.fromString(value));
  }
}
