import Layout from "@/components/Layout";
import useGetCart from "@/hooks/cart/useGetCart";
import React, { useState } from "react";
import { ShoppingBag, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { FORMAT_DATE } from "@/helper/convertTime";
import { formatToIDR } from "@/helper/convertIDR";
import Link from "next/link";
import DeleteCartButton from "@/components/views/Cart/DeleteCartButton";
import QuantityControl from "@/components/views/Cart/QuantityControl";
import { Checkbox } from "@/components/ui/checkbox";
import PaymentMethod from "@/hooks/cart/usePayment";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CreateTransaksi from "@/components/views/Cart/CreateTransaksi";
import { DashboardSkeleton } from "@/components/content/Skeleton";

const Cart = () => {
  const { data, isLoadingCart, errorCart, refreshCart } = useGetCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { ListPayment, isLoading, error } = PaymentMethod();
  const [selectedPayment, setSelectedPayment] = useState<string>(""); // State untuk menyimpan ID payment yang dipilih

  if (isLoadingCart) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
          <DashboardSkeleton />
        </div>
      </Layout>
    );
  }

  if (errorCart) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-red-500">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            <p>{errorCart}</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Handle checkbox individu
  const handleItemSelect = (itemId: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data.map((item) => item.id));
    }
  };

  //   const calculateSubtotal = () => {
  //     return data.reduce((total, item) => {
  //
  //   };

  const calculateSubtotal = () => {
    return data
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => {
        const itemPrice = item.activity.price;
        return total + itemPrice * item.quantity;
      }, 0);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Your Cart</h1>
            <span className="text-gray-500">
              {data.length} {data.length === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="flex items-center mb-4 pb-4 border-b">
            <div className="flex items-center">
              <Checkbox
                checked={
                  selectedItems.length === data.length && data.length > 0
                }
                onCheckedChange={handleSelectAll}
                className="mr-2"
              />
              <span className="font-medium">Select All Items</span>
            </div>
            <span className="ml-auto font-medium">
              {selectedItems.length} item(s) selected
            </span>
          </div>

          {data.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  Your cart is empty
                </h2>
                <p className="text-gray-500 mb-6">
                  Look like you haven't added anything to your cart yet
                </p>
                <Link href="/activity">
                  <Button>Start Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Select</TableHead>
                          <TableHead>Activity</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.map((cart) => (
                          <TableRow key={cart.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedItems.includes(cart.id)}
                                onCheckedChange={() =>
                                  handleItemSelect(cart.id)
                                }
                                className="mr-4"
                              />
                            </TableCell>

                            <TableCell>
                              <div className="flex items-center gap-4">
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                                  <img
                                    src={
                                      cart.activity.imageUrls[0] ||
                                      "https://placehold.co/200x200/png"
                                    }
                                    alt={cart.activity.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-medium">
                                    {cart.activity.title}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {cart.activity.city}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    Added on
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {FORMAT_DATE(cart.createdAt)}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {cart.activity.price_discount ? (
                                <div>
                                  <p className="text-green-600 font-medium">
                                    {formatToIDR(cart.activity.price)}
                                  </p>
                                  <p className="text-sm text-gray-500 line-through">
                                    {formatToIDR(cart.activity.price_discount)}
                                  </p>
                                </div>
                              ) : (
                                <p className="font-medium">
                                  {cart.activity.price}
                                </p>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <QuantityControl
                                  cartId={cart.id}
                                  initialQuantity={cart.quantity}
                                  activityName={cart.activity.title}
                                />
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              {(cart.activity.price_discount ||
                                cart.activity.price) * cart.quantity}
                            </TableCell>
                            <TableCell>
                              <DeleteCartButton cartId={cart.id} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Order Summary
                    </h2>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">
                          {formatToIDR(calculateSubtotal())}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Service Fee</span>
                        <span className="font-medium">Free</span>
                      </div>

                      <Separator />

                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">
                          {formatToIDR(calculateSubtotal())}
                        </span>
                      </div>

                      <RadioGroup
                        value={selectedPayment}
                        onValueChange={setSelectedPayment}
                        className="space-y-4"
                      >
                        {ListPayment.map((payment) => (
                          <div
                            key={payment.id}
                            className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                              selectedPayment === payment.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem
                                value={payment.id}
                                id={payment.id}
                              />
                            </div>
                            <img
                              src={payment.imageUrl}
                              alt={payment.name}
                              className="h-8 object-contain"
                            />
                          </div>
                        ))}
                      </RadioGroup>

                      {selectedItems.length > 0 &&
                      selectedPayment.length > 0 ? (
                        <CreateTransaksi
                          cartIds={selectedItems}
                          paymentMethodId={selectedPayment}
                        />
                      ) : (
                        <Button
                          variant="neutral"
                          className="w-full text-black"
                          disabled
                        >
                          Pilih Item dan pembayaran
                        </Button>
                      )}

                      <div>
                        <Link href="/activity">
                          <Button variant="variant" className="w-full">
                            Continue Find Destination
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
