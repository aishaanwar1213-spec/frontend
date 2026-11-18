
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("marketora-wishlist");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setWishlist(parsed);
        }
      }
    } catch (error) {
      console.error("Could not load wishlist:", error);
    } finally {
      setLoaded(true);
    }
  }, []);
// Empty wishlist whenever the app loads
useEffect(() => {
  localStorage.removeItem("marketora-wishlist");
  setWishlist([]);
  setLoaded(true);
}, []);
  // Save wishlist whenever it changes
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        "marketora-wishlist",
        JSON.stringify(wishlist)
      );
    } catch (error) {
      console.error("Could not save wishlist:", error);
    }
  }, [wishlist, loaded]);

  function toggleWishlist(product) {
    const productId = product?._id || product?.id;

    if (!productId) {
      console.error("Product ID is missing.");
      return;
    }

    setWishlist((current) => {
      const exists = current.some(
        (item) => String(item._id || item.id) === String(productId)
      );

      if (exists) {
        return current.filter(
          (item) => String(item._id || item.id) !== String(productId)
        );
      }

      return [...current, { ...product, _id: String(productId) }];
    });
  }

  function isWishlisted(productId) {
    return wishlist.some(
      (item) => String(item._id || item.id) === String(productId)
    );
  }

  function removeFromWishlist(productId) {
    setWishlist((current) =>
      current.filter(
        (item) => String(item._id || item.id) !== String(productId)
      )
    );
  }

  function clearWishlist() {
    setWishlist([]);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist,
        clearWishlist,
        wishlistLoaded: loaded,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}
