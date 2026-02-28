import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Image } from '@/components/ui/image';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { items, totalPrice, isOpen, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();

  return (
    <Sheet open={isOpen} onOpenChange={actions.toggleCart}>
      <SheetContent className="w-full sm:max-w-lg bg-background">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2 text-2xl font-heading font-bold text-foreground">
            <ShoppingBag className="w-6 h-6 text-primary" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              Your cart is empty
            </h3>
            <p className="text-foreground/60 font-paragraph mb-6">
              Add classes or wellness items to get started
            </p>
            <Button 
              onClick={actions.closeCart}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-120px)]">
            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {items.map((item) => (
                <div 
                  key={`${item.collectionId}-${item.itemId}`}
                  className="flex gap-4 p-4 bg-card rounded-lg border border-border hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src={item.image || 'https://static.wixstatic.com/media/980ffc_b276f17a91364fd7bf32ef7f4d58f132~mv2.png?originWidth=128&originHeight=128'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      width={80}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold text-foreground mb-1 truncate">
                      {item.name}
                    </h4>
                    <p className="text-primary font-paragraph font-semibold mb-2">
                      {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                    </p>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => actions.updateQuantity(item, Math.max(1, item.quantity - 1))}
                        className="h-7 w-7 p-0 border-border"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm font-paragraph font-semibold text-foreground w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                        className="h-7 w-7 p-0 border-border"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => actions.removeFromCart(item)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Cart Footer - Fixed */}
            <div className="border-t border-border pt-4 pb-2 bg-background">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-heading font-semibold text-foreground">
                  Total
                </span>
                <span className="text-2xl font-heading font-bold text-primary">
                  {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
                </span>
              </div>

              <Button
                onClick={actions.checkout}
                disabled={isCheckingOut}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 h-12 text-base font-semibold"
              >
                {isCheckingOut ? 'Processing...' : 'Checkout'}
              </Button>

              <Button
                onClick={actions.clearCart}
                variant="ghost"
                className="w-full mt-2 text-muted-foreground hover:text-foreground"
              >
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
