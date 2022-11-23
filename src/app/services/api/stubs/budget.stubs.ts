import { Bill } from 'src/app/models/budget/bill';
import { Vendor } from 'src/app/models/budget/vendor';
import { VendorType } from 'src/app/models/budget/vendor-type';
import { Expense } from 'src/app/models/core/expense';



export const expensesListStub = [new Expense({
    product: 'Chicken',
    subcategory: 'sub1',
    category: 'cat1',
    price: 11,
    currency: 'PLN',
    date: '2021-04-01',
    payment_method: 'Santander Red',
    vendor: 'Biedronka',
    vendor_type: 'Sklep spożywczy',
    location: 'Wrocław'
}, 'k1'),
new Expense({
    product: 'Chicken',
    subcategory: 'sub1',
    category: 'cat1',
    price: 13,
    currency: 'PLN',
    date: '2021-05-01',
    payment_method: 'Santander Red',
    vendor: 'Biedronka',
    vendor_type: 'Sklep spożywczy',
    location: 'Wrocław'
}, 'k2')]

export const incomesListStub = [];
export const innerTransfersListStub = [];
export const loansListStub = [];

export const vendorsStub = [
    Vendor.createFromProps(1, 'Biedronka', 1),
    Vendor.createFromProps(2, 'Żabka', 1),
    Vendor.createFromProps(3, 'NoLimits', 2),
]

export const vendorTypesStub = [
    VendorType.createFromProps(1, 'Sklep spożywczy'),
    VendorType.createFromProps(2, 'Szkoła tańca'),
    VendorType.createFromProps(3, 'Drogeria'),
]

export const billsStub = [
    Bill.createFromProps('2022-08-20', 'Biedronka', 'Wrocław', 'mBank Card', 2.99, 'PLN'),
    Bill.createFromProps('2022-08-20', 'Biedronka', 'Wrocław', 'mBank Card', 3.99, 'PLN'),
    Bill.createFromProps('2022-08-19', 'Żabka', 'Wrocław', 'Santander RED Card', 2.99, 'PLN'),
    Bill.createFromProps('2022-08-19', 'Żabka', 'Wrocław', 'Santander GOLD Card', 8.20, 'PLN'),
    Bill.createFromProps('2022-08-21', 'Żabka', 'Mikołów', 'Santander GOLD Card', 8.25, 'PLN')
]