import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WishlistContext = createContext(null);

const STORAGE_KEY = "shadestyle_wishlist";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) =>
        String(item._id || item.id) ===
        String(productId)
    );
  };

  const addToWishlist = (product) => {
    if (!product?._id && !product?.id) {
      return;
    }

    setWishlist((previous) => {
      const productId =
        product._id || product.id;

      const alreadyExists = previous.some(
        (item) =>
          String(item._id || item.id) ===
          String(productId)
      );

      if (alreadyExists) {
        return previous;
      }

      return [
        ...previous,
        product,
      ];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((previous) =>
      previous.filter(
        (item) =>
          String(item._id || item.id) !==
          String(productId)
      )
    );
  };

  const toggleWishlist = (product) => {
    if (!product?._id && !product?.id) {
      return;
    }

    const productId =
      product._id || product.id;

    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  const value = useMemo(
    () => ({
      wishlist,
      wishlistCount: wishlist.length,
      isInWishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
    }),
    [wishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
};

export default WishlistContext;