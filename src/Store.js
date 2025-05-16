import { configureStore, createSlice } from "@reduxjs/toolkit";

// Load saved cart from localStorage
const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
const savedOrder=JSON.parse(localStorage.getItem('orders')) || []

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    veg: [
      { name: 'Tomato', Price: 20.0, image: 'images/Tomato.jpg' },
      { name: 'potato', Price: 25.0, image: 'images/potato.jpg' },
      { name: 'spinach', Price: 50.0, image: 'images/spinach.jpg' },
      { name: 'carrot', Price: 30.0, image: 'images/carrot.jpg' },
      { name: 'cabbage', Price: 20.0, image: 'images/cabbage.jpg' },
      { name: 'cauliflower', Price: 10.0, image: 'images/cauliflower.jpg' },
      { name: 'coriander', Price: 9.0, image: 'images/coriander.jpg' },
      { name: 'onions', Price: 19.0, image: 'images/oninons.jpg' },
      { name: 'drumsticks', Price: 9.0, image: 'images/drumsticks.jpg' },
      { name: 'broccoli', Price: 40.0, image: 'images/broccoli.jpg' }
    ],
    nonveg: [
      { name: 'Chicken', Price: 250.0, image: 'images/chicken.jpg' },
      { name: 'drumsticks', Price: 200.0, image: 'images/drumsticks1.jpg' },
      { name: 'Fish', Price: 300.0, image: 'images/fish.jpg' },
      { name: 'Prawns', Price: 899.0, image: 'images/prawns.jpg' },
      { name: 'pork', Price: 299.0, image: 'images/pork.jpg' },
      { name: 'Crab', Price: 500.0, image: 'images/crab.jpg' },
      { name: 'Duck', Price: 500.0, image: 'images/duck.jpg' }
    ],
    cafe: [
      { name: 'sandwich', Price: 50.0, image: 'images/sandwich.jpeg' },
      { name: 'italian sandwich', Price: 70.0, image: 'images/italiansandwich.jpeg' },
      { name: 'chicken puff', Price: 50.0, image: 'images/chickenpuff.jpeg' },
      { name: 'egg puff', Price: 20.0, image: 'images/eggpuff.jpeg' },
      { name: 'veg puff', Price: 15.0, image: 'images/vegpuff.jpeg' },
      { name: 'panner puff', Price: 20.0, image: 'images/pannerpuff.jpeg' },
      { name: 'Samosa', Price: 80.0, image: 'images/samosa.jpg' },
      { name: 'kitkat cake', Price: 700.0, image: 'images/kitkatcake.jpeg' },
      { name: 'strawberry cake', Price: 500.0, image: 'images/strawberry.jpeg' },
      { name: 'choco cream cake', Price: 800.0, image: 'images/chococreamcake.jpeg' },
      { name: 'BBQ Burger', Price: 150.0, image: 'images/bbqburger.jpg' },
      { name: 'Beef Burger', Price: 90.0, image: 'images/beefburger.jpg' },
      { name: 'chicken burger', Price: 50.0, image: 'images/chickenburger.jpg' },
      { name: 'large burger', Price: 20.0, image: 'images/largeburger.jpg' },
      { name: 'veg burger', Price: 15.0, image: 'images/vegburger.jpg' },
      { name: 'cheese burger', Price: 20.0, image: 'images/cheeseburger.jpg' },
      { name: 'cheese pizza', Price: 700.0, image: 'images/cheesepizza.jpg' },
      { name: 'chicken pizza', Price: 500.0, image: 'images/chickenpizza.jpg' },
      { name: 'veg pizza', Price: 800.0, image: 'images/vegpizza.jpg' }
      
    ],
    toys: [
      { name: 'car', Price: 300.0, image: 'images/car.jpeg' },
      { name: 'battery Jeep', Price: 500.0, image: 'images/batteryjeep.jpeg' },
      { name: 'catcus', Price: 400.0, image: 'images/catcus.jpeg' },
      { name: 'dino', Price: 899.0, image: 'images/dino.jpeg' },
      { name: 'dog', Price: 299.0, image: 'images/dog.jpeg' },
      { name: 'jcb', Price: 500.0, image: 'images/jcb.jpeg' },
      { name: 'jeep', Price: 500.0, image: 'images/jeep.jpeg' },
      { name: 'rabbit teddy', Price: 500.0, image: 'images/rabbit.jpeg' },
      { name: 'robo', Price: 700.0, image: 'images/robo.jpeg' },
      { name: 'teddy', Price: 300.0, image: 'images/teddy.jpeg' }
    ],
    electronics: [
      { name: 'AC', Price: 30000.0, image: 'images/ac.jpeg' },
      { name: 'Cooker', Price: 1000.0, image: 'images/cooker.jpeg' },
      { name: 'Cooler', Price: 3000.0, image: 'images/cooler.jpeg' },
      { name: 'Fridge', Price: 10999.0, image: 'images/fridge.jpeg' },
      { name: 'Grinder', Price: 2999.0, image: 'images/grinder.jpeg' },
      { name: 'Iron Box', Price: 500.0, image: 'images/ironbox.jpeg' },
      { name: 'Kettle', Price: 500.0, image: 'images/kettle.jpeg' },
      { name: 'Micro Oven', Price: 5000.0, image: 'images/microoven.jpeg' },
      { name: 'Mixi', Price: 2000.0, image: 'images/mixi.jpeg' },
      { name: 'stove', Price: 2500.0, image: 'images/stove.jpeg' },
      { name: 'Washing Machine', Price: 20000.0, image: 'images/washingmachine.jpeg' }
    ],
    baby: [
      { name: 'Baby Towel', Price: 300.0, image: 'images/baby.jpeg' },
      { name: 'Soft Towel', Price: 200.0, image: 'images/babytowel.jpeg' },
      { name: 'Cetaphil Shampoo', Price: 350.0, image: 'images/cetaphil.jpeg' },
      { name: 'Dress', Price: 299.0, image: 'images/dress.jpeg' },
      { name: 'edew soap', Price: 199.0, image: 'images/edew.jpeg' },
      { name: 'Himalaya soap', Price: 50.0, image: 'images/himalaya.jpeg' },
      { name: 'Himalaya Shampoo', Price: 250.0, image: 'images/himalayashamp.jpeg' },
      { name: 'Johnson', Price: 50.0, image: 'images/johnson.png' },
      { name: 'Johnson Shamp', Price: 200.0, image: 'images/johnsonshamp.jpeg' }
    ],
    mobiles: [
      { name: 'Google', Price: 50000.0, image: 'images/google.jpeg' },
      { name: 'Iphone', Price: 90000.0, image: 'images/iphone.jpeg' },
      { name: 'nokia', Price: 1000.0, image: 'images/nokia.jpeg' },
      { name: 'oneplus', Price: 2899.0, image: 'images/oneplus.jpeg' },
      { name: 'Oppo', Price: 29999.0, image: 'images/oppo.jpeg' },
      { name: 'Realme', Price: 25000.0, image: 'images/realme.jpeg' },
      { name: 'Redmi', Price: 15000.0, image: 'images/redmi.jpeg' },
      { name: 'Samsung', Price: 75000.0, image: 'images/samsung.jpeg' },
      { name: 'Techno', Price: 20000.0, image: 'images/techno.jpeg' },
      { name: 'Vivo', Price: 42000.0, image: 'images/vivo.jpeg' }
    ]
  },
  reducers: {}
});

// Cart slice
const cartslice = createSlice({
  name: 'cart',
  initialState: savedCart,
  reducers: {
    AddToCart: (state, inputItem) => {
      const item = state.find(item => item.name === inputItem.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...inputItem.payload, quantity: 1 });
      }
    },
    IncCart: (state, inputItem) => {
      const item = state.find(item => item.name === inputItem.payload.name);
      if (item) {
        item.quantity++;
      }
    },
    DecCart: (state, inputItem) => {
      const item = state.find(item => item.name === inputItem.payload.name);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          return state.filter(i => i.name !== item.name);
        }
      }
    },
    RemoveFromCart: (state, inputItem) => {
      return state.filter(item => item.name !== inputItem.payload.name);
    },
    ClearCart: () => []
  }
});

// Order slice
const orderSlice = createSlice({
  name: 'orders',
  initialState:savedOrder,
  reducers: {
    AddOrder: (state, action) => {
      state.push(action.payload);
    }
  }
});

//create userSlice
const userSlice=createSlice({
  name:'users',
  initialState:{
    users:[],
    isAuthenticated:false,
    currentUser:null
  },
  reducers:{
    registerUser:(state,action)=>{
      state.users.push(action.payload);
    },
    loginUser:(state,inputData)=>{
      const foundUser=state.users.find(
        user=>user.username===inputData.payload.username&&
              user.password===inputData.payload.password);
      
      if (foundUser) {
        state.isAuthenticated=true;
        state.currentUser=foundUser; 
      }
      else{
        alert("invalid credentials")
      }
    },
    logOut:(state)=>{
      state.isAuthenticated=false;
      state.currentUser=null;
    }
  }
});
export const {registerUser,loginUser,logOut}=userSlice.actions;

// Configure store
const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartslice.reducer,
    orders: orderSlice.reducer,
    users:userSlice.reducer
  }
});

// Persist cart to localStorage on update
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart));
  localStorage.setItem('orders', JSON.stringify(state.orders));
});

// Exports
export const { AddToCart, IncCart, DecCart, RemoveFromCart, ClearCart } = cartslice.actions;
export const { AddOrder } = orderSlice.actions;
export default store;
