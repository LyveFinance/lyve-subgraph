import {
  UserDepositChanged as UserDepositChangedEvent

} from "../generated/StabilityPool/StabilityPool"
import {
   UserDeposit
} from "../generated/schema"

export function handleUserDepositChanged(event: UserDepositChangedEvent): void {
  let userId = event.params._depositor.toHex()
  let userDeposit = UserDeposit.load(userId)
  if (userDeposit == null) {
    userDeposit = new UserDeposit(userId)
  }
  userDeposit._depositor = event.params._depositor
  userDeposit._newDeposit = event.params._newDeposit
  userDeposit.blockNumber = event.block.number
  userDeposit.blockTimestamp = event.block.timestamp
  userDeposit.transactionHash = event.transaction.hash
  userDeposit.save()
}

