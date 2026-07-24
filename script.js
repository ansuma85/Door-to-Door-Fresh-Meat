let cart = [];
let orderCounter = 1;

const products = [
  {
    name:"Smoked Pork (Raw)",
    price:600,
    image:"https://i.postimg.cc/QMyQCPkR/Smoked-pork.jpg",
    available:true
  },

  {
    name:"Smoked Pork with Bamboo Shoot",
    subtitle:"Ready to Eat",
    pieces:"10–12 Pieces / Plate",
    price:100,
    image:"bamboo shot.png",
    available:true,
    type:"plate"
  },

  {
   
    name:"🍛 Smoked Pork Rice Meal",
    subtitle:"Complete Meal",
    pieces:"🍚 Rice • 🥣 Dal • 🧅 Onion • 🌶️ Chilli • 🍋 Lemon",
    price:150,
    image:"rice menu.png",
    available:true,
    type:"meal"
},
  {
    name: "🌭 Blood & Intestine Sausage",
    subtitle: "Ready to Eat",
    pieces: "3 Pieces • 6 Pieces • 9 Pieces",
    price: 250,
    image: "Sausage.png",
    available: true,
    type: "pack"
},
  {
  name: "🫙 Smoked Pork Pickle",
  subtitle: "Ready to Eat",
  pieces: "100g • 200g",
  price: 250,
  image: "Smoked-Pork-Pickle.png",
  available: true,
  type: "pickle"
},
{
  name: "🌶️ King Chilly Pickle",
  subtitle: "Extra Spicy",
  pieces: "100g • 200g",
  price: 250,
  image: "King-Chilly-Pickle.png",
  available: true,
  type: "pickle"
},
];

const container=document.getElementById("products");

products.forEach(product=>{
container.innerHTML+=`
<div class="card">
<img class="${product.type === 'pack' ? 'sausage-img' : 'product-img'}"
     src="${product.image}"
     alt="${product.name}">
<h2>${product.name}</h2>

${product.subtitle ? `<div style="font-size:15px;color:#1e8e3e;font-weight:bold;">${product.subtitle}</div>` : ""}

${product.pieces ? `<div style="font-size:14px;font-weight:bold;color:#444;">${product.pieces}</div>` : ""}

<p>₹${product.price}${
product.type === "plate"
? "/Plate"
: product.type === "meal"
? "/Meal"
: product.type === "pickle"
? "/Jar"
: product.type === "pack"
? "/Pack"
: "/kg"

}</p>


<select id="qty-${product.name}">
${product.type === "plate" ? `
    <option value="1">1 Plate</option>
    <option value="2">2 Plates</option>
    <option value="3">3 Plates</option>
    <option value="4">4 Plates</option>
    <option value="5">5 Plates</option>
` : product.type === "meal" ? `
    <option value="1">1 Meal</option>
    <option value="2">2 Meals</option>
    <option value="3">3 Meals</option>
    <option value="4">4 Meals</option>
    <option value="5">5 Meals</option>
 `   : product.type === "pickle" ? `
    <option value="100">100g Jar</option>
    <option value="200">200g Jar</option>
`: product.type === "pack" ? `
    <option value="1">1 Pack (3 Pieces)</option>
    <option value="2">2 Packs (6 Pieces)</option>
    <option value="3">3 Packs (9 Pieces)</option>
`

: `
    <option value="0.5">0.5 kg</option>
    <option value="1">1 kg</option>
    <option value="1.5">1.5 kg</option>
    <option value="2">2 kg</option>
    <option value="2.5">2.5 kg</option>
    <option value="3">3 kg</option>
    <option value="3.5">3.5 kg</option>
    <option value="4">4 kg</option>
    <option value="4.5">4.5 kg</option>
    <option value="5">5 kg</option>
    <option value="5.5">5.5 kg</option>
    <option value="6">6 kg</option>
    <option value="6.5">6.5 kg</option>
    <option value="7">7 kg</option>
    <option value="7.5">7.5 kg</option>
    <option value="8">8 kg</option>
    <option value="8.5">8.5 kg</option>
    <option value="9">9 kg</option>
    <option value="9.5">9.5 kg</option>
    <option value="10">10 kg</option>
`}
</select>




${product.available
? `<button onclick="addToCart('${product.name}',${product.price},document.getElementById('qty-${product.name}').value,'${product.type}')">Add to Cart</button>`
: `<button disabled>Out of Stock</button>`}
</div>`;
});

function addToCart(name,price,qty,type){
cart.push({
    name:name,
    qty:parseFloat(qty),
    type:type,
    price:price*parseFloat(qty)
});
updateCart();
alert(name+" added to cart!");
}

function updateCart() {
    document.getElementById("cartCount").innerText = cart.length;

    let html = "";
    let total = 0;

    if (cart.length === 0) {
        html = "Your cart is empty.";
    } else {
        cart.forEach((item, index) => {
            html += `
            <div style="margin-bottom:10px;">
                <strong>${item.name}</strong><br>
                ${item.qty} ${item.type=="plate" ? (item.qty==1 ? "Plate" : "Plates") : "kg"} - ₹${item.price}
                <button onclick="removeItem(${index})">❌</button>
            </div>`;
            total += item.price;
        });
    }

    document.getElementById("cartItems").innerHTML = html;
    document.getElementById("cartTotal").innerText = total;

  

    const grandTotal = total + 20;
    document.getElementById("grandTotal").innerText = grandTotal;
}

function removeItem(index){
cart.splice(index,1);
updateCart();
}

document.getElementById("cartBtn").onclick=()=>document.getElementById("cartPanel").classList.add("show");
document.getElementById("closeCart").onclick=()=>document.getElementById("cartPanel").classList.remove("show");

function generateOrderId(){
const d=new Date();
return `FM-${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}-${String(orderCounter++).padStart(3,"0")}`;
}

document.getElementById("orderBtn").onclick=function(){
if(cart.length===0){alert("Your cart is empty.");return;}

const name=document.getElementById("customerName").value.trim();
const phone=document.getElementById("customerPhone").value.trim();
const address=document.getElementById("customerAddress").value.trim();

if(!name||!phone||!address){
alert("Please fill Name, Phone Number and Delivery Address.");
return;
}
const orderId = generateOrderId();
let total=0;
let message= `🐷 SMOKIE

Order ID: ${orderId}

Customer: ${name}
Phone: ${phone}
Address: ${address}

Order Details:
`;

cart.forEach(item=>{
message += `• ${item.name} (${item.qty} ${
item.type === "plate"
  ? (item.qty == 1 ? "Plate" : "Plates")
  : item.type === "meal"
  ? (item.qty == 1 ? "Meal" : "Meals")
  : "kg"
}) - ₹${item.price}\n`;
total+=item.price;
});

message += `
Items Total: ₹${total}
Delivery Charge: ₹20
Grand Total: ₹${total + 20}

Thank you for ordering with  SMOKIE.`;

window.open("https://wa.me/919678601494?text="+encodeURIComponent(message),"_blank");

const date = new Date().toLocaleString();

let products = "";
cart.forEach(item => {
 products += `${item.name} (${item.qty} ${item.type === "plate" ? (item.qty == 1 ? "Plate" : "Plates") : "kg"}) - ₹${item.price}\n`;
});

const itemsTotal = total;
const deliveryCharge = 20;
const grandTotal = itemsTotal + deliveryCharge;

fetch("https://script.google.com/macros/s/AKfycbzS-fgday49ir-iBrjfyg7ZUrgdf7zfFURCVrDqJHQo3mmNCdVpRjRMM_C4WFZIQOKWbQ/exec", {
  method: "POST",
  body: new URLSearchParams({
    orderId: orderId,
    date: date,
    customerName: name,
    phone: phone,
    address: address,
    products: products,
    itemsTotal: itemsTotal,
    deliveryCharge: deliveryCharge,
    grandTotal: grandTotal
  })
})
.then(r => r.json())
.then(data => console.log("Order saved:", data))
.catch(err => console.error(err));
cart=[];
updateCart();
document.getElementById("customerName").value="";
document.getElementById("customerPhone").value="";
document.getElementById("customerAddress").value="";
document.getElementById("cartPanel").classList.remove("show");
};
