export type PlaceOrderItem = {
  id: string;
  quantity: number;
};

export type PlaceOrderFreight = {
  zipCodeOrigin: string;
  zipCodeDestination: string;
};

export type PlaceOrderInput = {
  user_id: string | null;
  items: PlaceOrderItem[];
  coupon_code?: string;
  freight: PlaceOrderFreight;
};

export type PlaceOrderOutputItem = {
  description: string;
  price: number;
  quantity: number;
};

export type PlaceOrderOutput = {
  order_id: string;
  zipCodeDestination: string;
  user: {
    name: string;
    cpf: string;
  };
  items: PlaceOrderOutputItem[];
  discount: number;
  total: number;
  freight: number;
};
