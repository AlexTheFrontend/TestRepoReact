// import "regenerator-runtime/runtime.js";

// choosing my elements
const trashContainer = document.querySelector(".trashContainer");
const moneyRaisedContainer = document.querySelector(".moneyRaised");
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const trashFormatter = new Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 8,
  maximumFractionDigits: 0,
  useGrouping: false,
});

const MAX_MONEY_RAISED = 30000000;

getTrashAmount();

async function getTrashAmount() {
  const amountRaised = await fetch("https://tscache.com/donation_total.json")
    .then((res) => res.json())
    .then((data) => data.count);
  moneyRaisedContainer.innerText = currencyFormatter.format(amountRaised);

  const amountLeftToRaise = Math.max(MAX_MONEY_RAISED - amountRaised, 0);
  const amountToString = trashFormatter.format(amountLeftToRaise);
  const trashAmount = {
    xxl: {
      amount: parseInt(`${amountToString[0]}${amountToString[1]}`),
      icon: "bag",
    },
    xl: {
      amount: parseInt(`${amountToString[2]}`),
      icon: "takeout",
    },
    lg: {
      amount: parseInt(`${amountToString[3]}`),
      icon: "headphones",
    },
    md: {
      amount: parseInt(`${amountToString[4]}`),
      icon: "phone",
    },
    sm: {
      amount: parseInt(`${amountToString[5]}`),
      icon: "toy-car",
    },
    xs: {
      amount: parseInt(`${amountToString[6]}`),
      icon: "bottle",
    },
  };
  console.log(">>trash amount", trashAmount, amountLeftToRaise);

  Object.values(trashAmount).forEach(({ amount, icon }) => {
    for (let i = 0; i < amount; i++) {
      createTrash(icon);
    }
  });
}

function createTrash(icon) {
  const img = document.createElement("img");
  const top = randomNumberBetween(0, 50);
  const size = top / 5 + 1;
  img.classList.add("trash");
  img.src = `/public/icons/${icon}.svg`;
  img.style.width = `${size}vmin`;
  img.style.height = `${size}vmin`;
  img.style.top = `${top}vh`;
  img.style.left = `${randomNumberBetween(0, 100)}vw`;
  img.style.setProperty("--rotation", `${randomNumberBetween(-30, 30)}deg`);
  trashContainer.appendChild(img);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
