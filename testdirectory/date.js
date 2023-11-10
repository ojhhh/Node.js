const dummy = [
  {
    real_estate_name: "문래 공차",
    trade_amount: "1",
    trade_date: "2023-11-09",
  },
  {
    real_estate_name: "문래 공차",
    trade_amount: "1",
    trade_date: "2023-11-10",
  },
  {
    real_estate_name: "문래 오래",
    trade_amount: "1",
    trade_date: "2023-11-03",
  },
  {
    real_estate_name: "문래 오래",
    trade_amount: "2",
    trade_date: "2023-11-09",
  },
  {
    real_estate_name: "문래 오래",
    trade_amount: "2",
    trade_date: "2023-11-10",
  },
];

const today = new Date();
const real_estate_name = "문래 공차";
let tenDays = [];
// let tenDaysAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// console.log(tenDaysAmount);

for (let i = 0; i < 10; i++) {
  const days = new Date(today.setDate(today.getDate() - 1));
  let year = days.getFullYear();
  let month = days.getMonth() + 1;
  let day = days.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  tenDays[i] = year + "-" + month + "-" + day;
}

// real_estate_name이 문래 공차와 같고 tenDays[?]의 trade_date가 같으면 해당 객체의 trade_amount를 tenDaysAmount에 저장

// console.log(tenDays);
// [
//   '2023-11-09', '2023-11-08',
//   '2023-11-07', '2023-11-06',
//   '2023-11-05', '2023-11-04',
//   '2023-11-03', '2023-11-02',
//   '2023-11-01', '2023-10-31'
// ]

// const findName = dummy.filter((dum) => dum.real_estate_name == "문래 공차");
// console.log("findName : ", findName);

// const tenday = [
//   "2023-11-09",
//   "2023-11-08",
//   "2023-11-07",
//   "2023-11-06",
//   "2023-11-05",
//   "2023-11-04",
//   "2023-11-03",
//   "2023-11-02",
//   "2023-11-01",
//   "2023-10-31",
// ];

// const findName2 = [
//   {
//     real_estate_name: "문래 공차",
//     trade_amount: "1",
//     trade_date: "2023-11-09",
//   },
//   {
//     real_estate_name: "문래 공차",
//     trade_amount: "1",
//     trade_date: "2023-11-10",
//   },

// ];

const realEstateNames = dummy.map((item) => item.real_estate_name);
const newRealEstateNames = [...new Set(realEstateNames)];

newRealEstateNames.forEach((real) => {
  const findName = dummy.filter((dum) => dum.real_estate_name == real);

  let tenDaysAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const ta = findName.map((item) => {
    const getIndexOf = tenDays.indexOf(item.trade_date);
    if (getIndexOf < 0) return;
    else tenDaysAmount[getIndexOf] = parseInt(item.trade_amount);
  });

  console.log(`${real}`, tenDaysAmount);
});
