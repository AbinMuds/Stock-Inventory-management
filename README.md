Project Description
	This is an Inventory management type of website where the user is supposed to be a business user that uses an app to add goods to the database and manage the quantity of the goods. When a user has to manage lots of items in the stock and if needed to track the quantity of the items, so that they are ready for the sale for the week, this apps solves that problem. This app helps to track the quantity of the items and just before sale gives a message that there is a limited quantity for certain items and also helps organize the items in the stock.

WireFrames 

HomePage

 















Add Items form





Items show page












Start Business 
























Business Homepage



USER STORIES 

As a user, user can start their own business.
As a user, user can have their own homepage and they can edit their details on the edit profile page
As a user, user can see the items on the homepage where they can visualize what items they         have and also they can search items on the homepage
 
 
Sprint 1: Basic Auth & Profiles
A user should be able to:
Navigate to "/" and see a basic splash page with:
The name of the website.
Links to "Log In" and "Sign Up".
Sign up for an account.
Log in to their account if they already have one.
Be redirected to their public profile page after logging in.
On their public profile page, see their name, and their join date.
See the site-wide header on every page with:
A link to "Log Out" if they're logged in.
Links to "Log In" and "Sign Up" if they're logged out.
Update their profile by making changes to their name.
Bonuses
A user should be able to:
See a "default" profile photo on their profile page before adding their own photo.
Update their profile photo.
Receive a welcome email after creating an account.

Sprint 2: CRUD
A user should be able to:
View a single item page (at "/items/1") including:
The item title
The items details
At least one high-quality image of the item.
View a list of items on the Home page:
Sorted by newest first.
With the item titles linked to the individual item "show" pages.
Click "Edit" on the item show page, and be redirected to the edit form.
Click "delete" on the item show page.
See a pop-up that says: "Are you sure you want to delete this item?"
If the user confirms, delete the items.
Create a page for sales, where we can add items and their quantity in the sale for this week or for the particular day.
Bonuses
A user should be able to:
Visit item pages via pretty URLs, like "/item".
Visit user profile pages via pretty URLs, like "/users/business".
See a relative published date, e.g. "2 days ago".

Sprint 3: Validations & Authorization
A user should be able to:
A user CANNOT sign up with an email (or username) that is already in use.
A user is authorized to perform certain actions on the site, according to the following rules:
A user MUST be logged in to create/update/destroy resources.
A user may only edit their own profile and edit/delete own items.
Bonuses
A user should be able to:
View an error message when form validations fail, for the following validations:
The title must be between 1 and 200 characters.
Content must not be empty.
View only the 10 most recent items on the homepage (pagination), with
A link/button to the "Next" 10.
A link/button to the "Previous" 10.
View all items  (i.e. filter items listed on the homepage by department).
 



Technology to be used:
Nodejs, Express, MongoDB.
