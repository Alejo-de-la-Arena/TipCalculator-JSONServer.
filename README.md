# Restaurant App

## Features
- Create New Order: Users can create a new order by entering the table number and time in a modal window.
- Select Dishes: The application fetches a list of available dishes from an API and allows users to select the desired quantity for each dish.
- Calculate Total: The application calculates the subtotal, tip amount, and total bill based on the selected dishes and the chosen tip percentage.
- Responsive Design: The application is designed to be responsive and works well on various screen sizes.
  
## Technologies Used
- HTML: Markup language for structuring the web page.
- CSS (Bootstrap): Styling framework for enhancing the appearance of the web page & building responsive and mobile-first design.
- JavaScript (VanillaJs): Programming language for adding interactivity to the web page.
- API Integration: Fetches data from an external API to populate the list of available dishes.
  
## How to Use
1. Open the application in a web browser.
2. Click on the "Nueva Orden" button to create a new order.
3. Enter the table number and time in the modal window and click "Crear Orden".
4. Select the desired quantity for each dish from the list of available dishes.
5. Optionally, select a tip percentage.
6. The application will calculate the total bill including the subtotal, tip amount, and total bill.
7. Repeat steps 2-6 to create additional orders.

 
## Installation
There is no installation required for this project. Simply open the HTML file in a web browser to use the application.

## Known Issues
The application currently relies on a local API for fetching the list of available dishes. It needs to be modified to fetch data from a remote API to work in a production environment.
The application does not handle edge cases such as invalid inputs or errors from the API.
