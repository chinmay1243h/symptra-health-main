import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Package, ShoppingCart, DollarSign } from 'lucide-react'; // Import DollarSign
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useCart } from '@/context/cartContext';
import { useAuth } from '@/context/AuthContext'; // Import useAuth

// Define the base URL for your backend API
const API_BASE_URL = 'http://localhost:5000/api';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBuyingNow, setIsBuyingNow] = useState<string | null>(null); // Track loading state for buy now button
  const { addItemToCart } = useCart();
  const { user } = useAuth(); // Get logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          const fetchedProducts: Product[] = data.data.map((p: any) => ({
            id: p._id,
            name: p.name,
            description: p.description,
            price: p.price,
            category: p.category,
            imageUrl: p.imageUrl,
            stock: p.stock,
          }));
          setProducts(fetchedProducts);
        } else {
          toast.error(data.message || 'Failed to load products.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyNow = async (product: Product) => {
    if (!user) {
      toast.error("Please log in to purchase products.");
      navigate('/login');
      return;
    }
    if (product.stock === 0) {
      toast.error(`"${product.name}" is out of stock.`);
      return;
    }

    setIsBuyingNow(product.id); // Set loading for this specific product

    // Prepare order items for the backend (single item)
    const orderItems = [{
      product: product.id,
      quantity: 1,
    }];

    // Mock shipping and payment details for now
    const shippingAddress = {
      address: user.address || "123 Health St",
      city: "Health City",
      postalCode: "12345",
      country: "USA",
    };
    const paymentMethod = "Stripe";
    const taxPrice = 0;
    const shippingPrice = 0;
    const totalPrice = product.price; // Total for single item

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          orderItems,
          shippingAddress,
          paymentMethod,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(`"${product.name}" purchased successfully! (Payment Simulated)`);
        navigate(`/order-confirmation/${data.data._id}`); // Redirect to order confirmation
      } else {
        toast.error(data.message || `Failed to purchase "${product.name}".`);
      }
    } catch (error) {
      console.error("Error during 'Buy Now':", error);
      toast.error("An error occurred during purchase.");
    } finally {
      setIsBuyingNow(null); // Clear loading state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto pt-24 px-4 pb-12">
        <h1 className="text-3xl font-bold text-healthcare-dark mb-6">Our Products</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Explore our range of health and wellness products designed to support your well-being.
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-healthcare-primary" />
            <span className="ml-3 text-lg text-gray-600">Loading products...</span>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-48 object-cover rounded-t-lg mb-4" 
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/400x300/E0E0E0/333333?text=No+Image`;
                    }}
                  />
                  <CardTitle className="text-xl font-semibold text-healthcare-primary line-clamp-2">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    Category: {product.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <span className="text-2xl font-bold text-healthcare-dark">${product.price.toFixed(2)}</span>
                  <p className="text-gray-700 mb-4 line-clamp-3">{product.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2"> {/* Use flex gap for buttons */}
                    <Button 
                      className="flex-1 flex items-center gap-2" // Make button fill space
                      disabled={product.stock === 0}
                      onClick={() => addItemToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button 
                      className="flex-1 flex items-center gap-2" // Make button fill space
                      variant="outline"
                      disabled={product.stock === 0 || isBuyingNow === product.id} // Disable if out of stock or currently buying
                      onClick={() => handleBuyNow(product)}
                    >
                      {isBuyingNow === product.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <DollarSign className="h-4 w-4" />
                      )}
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p>No products available yet.</p>
            <p className="mt-2">Check back later or contact support.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;