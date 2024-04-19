import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  BeaconUpgraded,
  BorrowingFeePaid,
  Initialized,
  OwnershipTransferred,
  Upgraded,
  VesselCreated,
  VesselUpdated
} from "../generated/BorrowerOperations/BorrowerOperations"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createBorrowingFeePaidEvent(
  _asset: Address,
  _borrower: Address,
  _feeAmount: BigInt
): BorrowingFeePaid {
  let borrowingFeePaidEvent = changetype<BorrowingFeePaid>(newMockEvent())

  borrowingFeePaidEvent.parameters = new Array()

  borrowingFeePaidEvent.parameters.push(
    new ethereum.EventParam("_asset", ethereum.Value.fromAddress(_asset))
  )
  borrowingFeePaidEvent.parameters.push(
    new ethereum.EventParam("_borrower", ethereum.Value.fromAddress(_borrower))
  )
  borrowingFeePaidEvent.parameters.push(
    new ethereum.EventParam(
      "_feeAmount",
      ethereum.Value.fromUnsignedBigInt(_feeAmount)
    )
  )

  return borrowingFeePaidEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}

export function createVesselCreatedEvent(
  _asset: Address,
  _borrower: Address,
  arrayIndex: BigInt
): VesselCreated {
  let vesselCreatedEvent = changetype<VesselCreated>(newMockEvent())

  vesselCreatedEvent.parameters = new Array()

  vesselCreatedEvent.parameters.push(
    new ethereum.EventParam("_asset", ethereum.Value.fromAddress(_asset))
  )
  vesselCreatedEvent.parameters.push(
    new ethereum.EventParam("_borrower", ethereum.Value.fromAddress(_borrower))
  )
  vesselCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "arrayIndex",
      ethereum.Value.fromUnsignedBigInt(arrayIndex)
    )
  )

  return vesselCreatedEvent
}

export function createVesselUpdatedEvent(
  _asset: Address,
  _borrower: Address,
  _debt: BigInt,
  _coll: BigInt,
  stake: BigInt,
  operation: i32
): VesselUpdated {
  let vesselUpdatedEvent = changetype<VesselUpdated>(newMockEvent())

  vesselUpdatedEvent.parameters = new Array()

  vesselUpdatedEvent.parameters.push(
    new ethereum.EventParam("_asset", ethereum.Value.fromAddress(_asset))
  )
  vesselUpdatedEvent.parameters.push(
    new ethereum.EventParam("_borrower", ethereum.Value.fromAddress(_borrower))
  )
  vesselUpdatedEvent.parameters.push(
    new ethereum.EventParam("_debt", ethereum.Value.fromUnsignedBigInt(_debt))
  )
  vesselUpdatedEvent.parameters.push(
    new ethereum.EventParam("_coll", ethereum.Value.fromUnsignedBigInt(_coll))
  )
  vesselUpdatedEvent.parameters.push(
    new ethereum.EventParam("stake", ethereum.Value.fromUnsignedBigInt(stake))
  )
  vesselUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "operation",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(operation))
    )
  )

  return vesselUpdatedEvent
}
