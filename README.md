<p align="center">*This repository was created during our time as students at Code Chrysalis.</p><br>
<p align="right"><img src="https://img.shields.io/badge/license-MIT-green" height=15px>
</p>

<p align="center"><img src="images/waricanLogo.png" width="200px"></p>

<br>
<h1 align="center">Warican</h1><br>

<strong>The ultimate smartphone application for people who love to eat out but don't want the hassle of splitting the bill.</strong>
<br>

## 1. Name

---

The name warican comes from a Japanese word, warikan（割り勘）, which means splitting the payment. The use of "can" in the name indicates users can indeed split the bill without any hassle.
<br>
<br>

## 2. Usage

---

Using Warican on the smartphone, users can easily split the bill of the meal they share with friends. 

First, the users set up a group by clicking on the icons of the people they are with.<br><br>
<p align="center"><img src="images/waricanGroupSetting.png" width= "200px"></p><br>
Click on the confirm button.<br><br>
<p align="center"><img src="images/waricanGroupSetting2.png" width="200px"></p><br>
The users enter the id of the bill the restaraunt issues. When they do, they see the amount each of them needs to pay and also the total amount.<br><br>
<p align="center"><img src="images/waricanCalculation.png" width="200px"></p><br>
Hit the payment button to jump to a payment page and enter email address and credit card information to pay.<br><br>

That's it! The bill is split.

No more calculating how much money each person must pay, going around the table to collect money, or worrying about the change!
<br>
<br>

## 4. How it works

---

The way the application works is as follows. First, the warican server keeps the data of restaurants and users who have signed up for the service. 

If a group of service users wants to split a bill, they first sign in the service and click on the friends they are eating with on the friends list. The friend list that users see is created using the data in the table:customer in the database.

<p align="center"><img src="images/db1.png" width="500px"></p>

This user action tells the application how many users are going to share a bill.

When the users input the id of the bill, the application will go get the data about the transaction from the table:receipt. (The restaurant has already entered the data in the system.) 

<p align="center"><img src="images/db2.png" width="500px"></p>

The data from the table:receipt include the total balance, the application use that information and calculates how much each person needs to pay based on the number of the users.

With a click of a button, the application directs the user to the payment page of Stripe Checkout. Stripe provides the payment compliance. And the payment is made to the stripe account. Once the payment is done on that page, the user is brought back to the application's success page.<br><br>

<p align="center"><img src="images/currentSystem.png" width="500px"></p>

<br><br>

## 5. Technology used

---

This software was built with the following technologies.<br>

<p align="center"><img src="images/technologies.png" width=50%></p>
<br>

## 6. Future features

---
<img src="images/futureSystem.png" align="right" width="400px"> 
<p>For this stage, we implemented the core of the service, but to realize the project goal, we envision to:

- Login / register function.

- Deploy Stripe Connect for fund transfer to Merchants

- Flexibility to adjust each person's payment amount and recalculate other people's amount automatically

- Notification of payment status to both users and merchants</p>

<br>

## 7. Authors<br>

---

Co-authors of this application

- Eliot Austin-Forbes
- Naoto Maeda
- Sayaka Nakajima
- Kaisei Suzuki
- Mio Maeshima
  <br>
  <br>

## 8. Acknowledgments

---

We are indebted to the genuine support and insightful advice by . . .<br><br>

- Rafael Viana<br>
- Eriko Kidera<br>
- Yusuke Yamada<br>

<br>

## 9. Liecense

---
- MIT
