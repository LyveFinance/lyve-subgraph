import {
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  BorrowingFeePaid as BorrowingFeePaidEvent,
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Upgraded as UpgradedEvent,
  VesselCreated as VesselCreatedEvent,
  VesselUpdated as VesselUpdatedEvent

} from "../generated/BorrowerOperations/BorrowerOperations"
import {
  AdminChanged,
  BeaconUpgraded,
  BorrowingFeePaid,
  Initialized,
  OwnershipTransferred,
  Upgraded,
  VesselCreated,
  Vessel,
  VesselUpdate
} from "../generated/schema"

export function handleAdminChanged(event: AdminChangedEvent): void {
  let entity = new AdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousAdmin = event.params.previousAdmin
  entity.newAdmin = event.params.newAdmin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBeaconUpgraded(event: BeaconUpgradedEvent): void {
  let entity = new BeaconUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beacon = event.params.beacon

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBorrowingFeePaid(event: BorrowingFeePaidEvent): void {
  let entity = new BorrowingFeePaid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._asset = event.params._asset
  entity._borrower = event.params._borrower
  entity._feeAmount = event.params._feeAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVesselCreated(event: VesselCreatedEvent): void {
  let entity = new VesselCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._asset = event.params._asset
  entity._borrower = event.params._borrower
  entity.arrayIndex = event.params.arrayIndex

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVesselUpdated(event: VesselUpdatedEvent): void {
  let vesselId = event.params._borrower.toHex() + "-" + event.params._asset.toHex()
  let vessel = Vessel.load(vesselId)
  if (vessel == null) {
    vessel = new Vessel(vesselId)
    vessel._borrower = event.params._borrower
    vessel._asset = event.params._asset
    vessel.updates = []
  }

  let updateId = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let update = new VesselUpdate(updateId)
  update._debt = event.params._debt
  update._coll = event.params._coll
  update.operation = event.params.operation
  update.stake = event.params.stake
  update.blockNumber = event.block.number
  update.blockTimestamp = event.block.timestamp
  update.transactionHash = event.transaction.hash
  update.save()
  if(update.operation == 1){
    vessel._status = 1
  }else{
    vessel._status = 0
  }
  let updates = vessel.updates
  updates.push(update.id)
  vessel.updates = updates
  vessel.save()
}

