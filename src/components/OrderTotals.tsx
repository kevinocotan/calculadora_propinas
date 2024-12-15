import { useCallback } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
    order: OrderItem[]
    tip: number
    placeOrder : () => void
}


export default function OrderTotals({ order, tip, placeOrder }: OrderTotalsProps) {

    const SubtotalAmount = useCallback(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

    const tipAmount = useCallback(() => SubtotalAmount() * tip, [tip, order])

    const totalAmount = useCallback(() => SubtotalAmount() + tipAmount(), [tip, order])


    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Totales y Propina:</h2>
                <p>Subtotal a pagar: {''}
                    <span className="font-bold">{formatCurrency(SubtotalAmount())}</span>
                </p>

                <p>Propina: {''}
                    <span className="font-bold">{formatCurrency(tipAmount())}</span>
                </p>

                <p>Total a pagar: {''}
                    <span className="font-bold">{formatCurrency(totalAmount())}</span>
                </p>

            </div>

            <button className="w-full bg-black p-3 uppercase text-white font-bold mt10 disabled:opacity-15"
                disabled={totalAmount() === 0}
                onClick={placeOrder}
            >
                Guardar Orden
            </button>
        </>
    )
}