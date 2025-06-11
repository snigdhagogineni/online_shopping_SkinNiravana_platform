# online_shopping_SkinNiravana_platform

Step 1:
Prerequisites
Make sure you have the following installed on your system:
	•	Nord.js from www.nordjs.org
	•	install Nord using npm (usually included with Node.js installation):
       		npm install 
	•	install all dependencies like Express passport mongoose using npm: npm install express mongoose express-session passport passport-local bcryptjs connect-flash
										   npm install method-override --save


Step 2:

Make sure all dependencies installed
Extract the zip file and open it on visual Code. 

Step 3: 

Make sure that port is running on localhost 3800 in app.js file 
Adjust the db names according to your preferences.
Running the App
Start the application:
 node app.js  This will run the app.js file using Node.js.
Open your web browser and visit http://localhost:3800 (or the port that is specified in app.js).
		
In the localhost page on the web browser, the login page will be displayed for skinNiravana. 
All the new users need to signup by giving their credentials. All these credentials will be saved in mongodb
The returning user can directly login by entering their username and password.
After Successful login all the list of the items will be displayed. These items can be filtered using the search bar and the dropdown bar provided.
All the items and be added to the cart, the  quantity of the items and be changed int he cart section.
Finally by clicking the buy button the order will be placed.



The initial login page can also be used bye the admins to update or make changes to the inventory. For all the admins the user name is admin. 
The admins get options to edit the items, delete the items, add new items. Any of the changes made by the admin, those change will be updated in the mongodb.


On clicking the logout button, the page redirects to the login page.
