import { BurgerKingCardInsert } from "./BurgerKingCardInsert";
import { BurgerKingCartAdd } from "./BurgerKingCartAdd";
import { BurgerKingComboPopup } from "./BurgerKingComboPopup";
import { BurgerKingDineMode } from "./BurgerKingDineMode";
import { BurgerKingMembership } from "./BurgerKingMembership";
import { BurgerKingMembershipAccrual } from "./BurgerKingMembershipAccrual";
import { BurgerKingMenu } from "./BurgerKingMenu";
import { BurgerKingOrderConfirm } from "./BurgerKingOrderConfirm";
import { BurgerKingPayMethod } from "./BurgerKingPayMethod";
import { BurgerKingReceiptPopup } from "./BurgerKingReceiptPopup";
import { BurgerKingSideUpsell } from "./BurgerKingSideUpsell";
import { BurgerKingStart } from "./BurgerKingStart";
import { BurgerKingUpsell } from "./BurgerKingUpsell";
import { KfcBestUpsell } from "./KfcBestUpsell";
import { KfcCardConfirm } from "./KfcCardConfirm";
import { KfcCardInsert } from "./KfcCardInsert";
import { KfcMembership } from "./KfcMembership";
import { KfcMenu } from "./KfcMenu";
import { KfcOrderComplete } from "./KfcOrderComplete";
import { KfcOrderReview } from "./KfcOrderReview";
import { KfcPayMethod } from "./KfcPayMethod";
import { KfcReceiptPrompt } from "./KfcReceiptPrompt";
import { KfcSetCustomize } from "./KfcSetCustomize";
import { KfcSetUpsell } from "./KfcSetUpsell";
import { KfcSideSize } from "./KfcSideSize";
import { KfcStart } from "./KfcStart";
import { LotteriaCardInsert } from "./LotteriaCardInsert";
import { LotteriaMenu } from "./LotteriaMenu";
import { LotteriaOrderComplete } from "./LotteriaOrderComplete";
import { LotteriaPayMethod } from "./LotteriaPayMethod";
import { LotteriaReceiptPrompt } from "./LotteriaReceiptPrompt";
import { LotteriaSetPopup } from "./LotteriaSetPopup";
import { LotteriaSideSelect } from "./LotteriaSideSelect";
import { LotteriaStart } from "./LotteriaStart";
import { GeneralKioskSelect } from "./GeneralKioskSelect";
import { PaymentAmount } from "./PaymentAmount";
import { PaymentAuth } from "./PaymentAuth";
import { PaymentCardInsert } from "./PaymentCardInsert";
import { PaymentComplete } from "./PaymentComplete";
import { ParkingComplete } from "./ParkingComplete";
import { ParkingInfo } from "./ParkingInfo";
import { ParkingPlate } from "./ParkingPlate";
import { KtxStart } from "./KtxStart";
import { KtxBooking } from "./KtxBooking";
import { KtxTrainList } from "./KtxTrainList";
import { KtxSeatSelect } from "./KtxSeatSelect";
import { KtxPayment } from "./KtxPayment";
import { KtxComplete } from "./KtxComplete";
import { KtxReservation } from "./KtxReservation";
import { GeneralComplete } from "./GeneralComplete";
import { GeneralConfirm } from "./GeneralConfirm";
import { GeneralDepartment } from "./GeneralDepartment";
import { GeneralDoctor } from "./GeneralDoctor";
import { GeneralMode } from "./GeneralMode";
import { GeneralSsn } from "./GeneralSsn";
import { GeneralStart } from "./GeneralStart";
import { GeneralSummary } from "./GeneralSummary";
import { CafeGenericCardInsert } from "./CafeGenericCardInsert";
import { CafeGenericCart } from "./CafeGenericCart";
import { CafeGenericCategory } from "./CafeGenericCategory";
import { CafeGenericDineMode } from "./CafeGenericDineMode";
import { CafeGenericMenu } from "./CafeGenericMenu";
import { CafeGenericOrderComplete } from "./CafeGenericOrderComplete";
import { CafeGenericPayMethod } from "./CafeGenericPayMethod";
import { CafeGenericSize } from "./CafeGenericSize";
import { CafeGenericStart } from "./CafeGenericStart";
import { MegaCardInsert } from "./MegaCardInsert";
import { MegaCart } from "./MegaCart";
import { MegaCategory } from "./MegaCategory";
import { MegaDineMode } from "./MegaDineMode";
import { MegaMenu } from "./MegaMenu";
import { MegaOrderComplete } from "./MegaOrderComplete";
import { MegaPayMethod } from "./MegaPayMethod";
import { MegaSize } from "./MegaSize";
import { MegaStart } from "./MegaStart";
import { EdiyaCardInsert } from "./EdiyaCardInsert";
import { EdiyaCart } from "./EdiyaCart";
import { EdiyaCategory } from "./EdiyaCategory";
import { EdiyaDineMode } from "./EdiyaDineMode";
import { EdiyaMenu } from "./EdiyaMenu";
import { EdiyaOrderComplete } from "./EdiyaOrderComplete";
import { EdiyaPayMethod } from "./EdiyaPayMethod";
import { EdiyaSize } from "./EdiyaSize";
import { EdiyaStart } from "./EdiyaStart";
import { StarbucksCardInsert } from "./StarbucksCardInsert";
import { StarbucksCart } from "./StarbucksCart";
import { StarbucksCategory } from "./StarbucksCategory";
import { StarbucksDineMode } from "./StarbucksDineMode";
import { StarbucksMenu } from "./StarbucksMenu";
import { StarbucksOptions } from "./StarbucksOptions";
import { StarbucksOrderComplete } from "./StarbucksOrderComplete";
import { StarbucksPayMethod } from "./StarbucksPayMethod";
import { StarbucksSize } from "./StarbucksSize";
import { StarbucksStart } from "./StarbucksStart";
import { McdonaldsCategory } from "./McdonaldsCategory";
import { McdonaldsDineMode } from "./McdonaldsDineMode";
import { McdonaldsSetSize } from "./McdonaldsSetSize";
import { McdonaldsSetSingle } from "./McdonaldsSetSingle";
import { McdonaldsDrinkSelect } from "./McdonaldsDrinkSelect";
import { McdonaldsOrderConfirm } from "./McdonaldsOrderConfirm";
import { McdonaldsOrderConfirmSingle } from "./McdonaldsOrderConfirmSingle";
import { McdonaldsSideSelect } from "./McdonaldsSideSelect";
import { McdonaldsStart } from "./McdonaldsStart";
import { McdonaldsUpsell } from "./McdonaldsUpsell";
import { McdonaldsOrderReview } from "./McdonaldsOrderReview";
import { McdonaldsTableService } from "./McdonaldsTableService";
import { McdonaldsPayMethod } from "./McdonaldsPayMethod";
import { McdonaldsPayProcessing } from "./McdonaldsPayProcessing";
import type { CustomLayoutComponent } from "./types";

export const CUSTOM_LAYOUTS: Record<string, CustomLayoutComponent> = {
  "mcdonalds-start": McdonaldsStart,
  "burgerking-start": BurgerKingStart,
  "burgerking-membership": BurgerKingMembership,
  "burgerking-menu": BurgerKingMenu,
  "burgerking-combo-popup": BurgerKingComboPopup,
  "burgerking-upsell": BurgerKingUpsell,
  "burgerking-cart-add": BurgerKingCartAdd,
  "burgerking-side-upsell": BurgerKingSideUpsell,
  "burgerking-dine-mode": BurgerKingDineMode,
  "burgerking-order-confirm": BurgerKingOrderConfirm,
  "burgerking-receipt-popup": BurgerKingReceiptPopup,
  "burgerking-pay-method": BurgerKingPayMethod,
  "burgerking-card-insert": BurgerKingCardInsert,
  "burgerking-membership-accrual": BurgerKingMembershipAccrual,
  "lotteria-start": LotteriaStart,
  "lotteria-menu": LotteriaMenu,
  "lotteria-set-popup": LotteriaSetPopup,
  "kfc-best-upsell": KfcBestUpsell,
  "kfc-card-confirm": KfcCardConfirm,
  "kfc-card-insert": KfcCardInsert,
  "kfc-membership": KfcMembership,
  "kfc-menu": KfcMenu,
  "kfc-order-complete": KfcOrderComplete,
  "kfc-order-review": KfcOrderReview,
  "kfc-pay-method": KfcPayMethod,
  "kfc-receipt-prompt": KfcReceiptPrompt,
  "kfc-set-customize": KfcSetCustomize,
  "kfc-set-upsell": KfcSetUpsell,
  "kfc-side-size": KfcSideSize,
  "kfc-start": KfcStart,
  "lotteria-card-insert": LotteriaCardInsert,
  "lotteria-order-complete": LotteriaOrderComplete,
  "lotteria-pay-method": LotteriaPayMethod,
  "lotteria-receipt-prompt": LotteriaReceiptPrompt,
  "lotteria-side-select": LotteriaSideSelect,
  "mcdonalds-category": McdonaldsCategory,
  "mcdonalds-dine-mode": McdonaldsDineMode,
  "mcdonalds-set-single": McdonaldsSetSingle,
  "mcdonalds-set-size": McdonaldsSetSize,
  "mcdonalds-side-select": McdonaldsSideSelect,
  "mcdonalds-drink-select": McdonaldsDrinkSelect,
  "mcdonalds-order-confirm": McdonaldsOrderConfirm,
  "mcdonalds-order-confirm-single": McdonaldsOrderConfirmSingle,
  "mcdonalds-upsell": McdonaldsUpsell,
  "mcdonalds-order-review": McdonaldsOrderReview,
  "mcdonalds-table-service": McdonaldsTableService,
  "mcdonalds-pay-method": McdonaldsPayMethod,
  "mcdonalds-pay-processing": McdonaldsPayProcessing,
  "starbucks-start": StarbucksStart,
  "starbucks-dine-mode": StarbucksDineMode,
  "starbucks-category": StarbucksCategory,
  "starbucks-menu": StarbucksMenu,
  "starbucks-size": StarbucksSize,
  "starbucks-options": StarbucksOptions,
  "starbucks-cart": StarbucksCart,
  "starbucks-pay-method": StarbucksPayMethod,
  "starbucks-card-insert": StarbucksCardInsert,
  "starbucks-order-complete": StarbucksOrderComplete,
  "ediya-start": EdiyaStart,
  "ediya-dine-mode": EdiyaDineMode,
  "ediya-category": EdiyaCategory,
  "ediya-menu": EdiyaMenu,
  "ediya-size": EdiyaSize,
  "ediya-cart": EdiyaCart,
  "ediya-pay-method": EdiyaPayMethod,
  "ediya-card-insert": EdiyaCardInsert,
  "ediya-order-complete": EdiyaOrderComplete,
  "mega-start": MegaStart,
  "mega-dine-mode": MegaDineMode,
  "mega-category": MegaCategory,
  "mega-menu": MegaMenu,
  "mega-size": MegaSize,
  "mega-cart": MegaCart,
  "mega-pay-method": MegaPayMethod,
  "mega-card-insert": MegaCardInsert,
  "mega-order-complete": MegaOrderComplete,
  "cafe-generic-start": CafeGenericStart,
  "cafe-generic-dine-mode": CafeGenericDineMode,
  "cafe-generic-category": CafeGenericCategory,
  "cafe-generic-menu": CafeGenericMenu,
  "cafe-generic-size": CafeGenericSize,
  "cafe-generic-cart": CafeGenericCart,
  "cafe-generic-pay-method": CafeGenericPayMethod,
  "cafe-generic-card-insert": CafeGenericCardInsert,
  "cafe-generic-order-complete": CafeGenericOrderComplete,
  "general-kiosk-select": GeneralKioskSelect,
  "general-start": GeneralStart,
  "general-mode": GeneralMode,
  "general-ssn": GeneralSsn,
  "general-confirm": GeneralConfirm,
  "general-department": GeneralDepartment,
  "general-doctor": GeneralDoctor,
  "general-summary": GeneralSummary,
  "general-complete": GeneralComplete,
  "payment-auth": PaymentAuth,
  "payment-amount": PaymentAmount,
  "payment-card-insert": PaymentCardInsert,
  "payment-complete": PaymentComplete,
  "parking-plate": ParkingPlate,
  "parking-info": ParkingInfo,
  "parking-complete": ParkingComplete,
  "ktx-start": KtxStart,
  "ktx-booking": KtxBooking,
  "ktx-train-list": KtxTrainList,
  "ktx-seat-select": KtxSeatSelect,
  "ktx-payment": KtxPayment,
  "ktx-complete": KtxComplete,
  "ktx-reservation": KtxReservation,
};

export function getCustomLayout(id: string): CustomLayoutComponent | undefined {
  return CUSTOM_LAYOUTS[id];
}
