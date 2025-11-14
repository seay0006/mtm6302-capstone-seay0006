Colin Seay
041097377
Capstone Project - Part 1
_________________
In this document I used the API given by the APOD website. All the images used in the final version are used from 

_______________
Requirements: 
1. The prototype should have at least one HTML (index.html) and one CSS (style.css) file. Optionally, one JavaScript (script.js) file may be added to the project.  
    <!-- Completed -->

2. The prototype should closely match the mockup complete in Part 2. 
    <!-- Completed -->
3. The prototype should be responsive.
    <!-- Completed -->
4. The use of modern CSS Frameworks, like Bootstrap or Tailwind, for the prototype is allowed. 
    <!-- Completed -->
5. Ensure you have permission to use any external resources use for the prototype.
    <!-- Completed -->
6. A report should be added to the README.md file that outlines the steps taken to create the prototype. The report should include resources used and challenges faced in completing the prototype.
    <!-- Listed Below -->

__________________
    
    <!-- Steps are listed below -->

1. I only added the HTML and CSS files - I did this since any file in my work should be important. By only using these two I limited my search pool for finding solutions to my problems. Having js as another solution could have gotten me more confused

2. To hit requirement 2, I needed to add a form for the users to select there date in a calender, I did this by

3. Makign it responsive was easy since its just adding media queries


4. I didn't use any, HOWEVER, I did intend on it though due to no time in my personal life I couldnt find space to do it well

5. I ended up changing part 1, i added a js file so taht i could plug the api through. wihtout it I dont believe i had another option

<!-- Part 4 below -->
1. I needed to change the <nav> area to incorporate moving my favourites.html over to the index.html since the new requirements state I can only have 1 html page.
    - I started this by changing my <a href> into <a href = "#"> then linking the APOD and Favourites.


2. I divided my html page into sections for organisation reasons, keeping my two seperate pages more clearly seperate.

3. Moved the <script> for my js file to the bottom of index.html

4. Adding navigation between section at the bottom of my js file under comment part-4 begins here

---------------------------
    <!-- DIFFICULTIES -->

1. I had a VERY hard time finding how to get the API to show me an image, turns out it was a small issue with how i had used capitals. My javaScript was searching for and image when i had my html listed as Image. the capital "I" being the only difference

2. I encountered a difficulty in applying an image in the background of my website, being as mine currently in the mockup shows a space background. I am going to instead get around this by making stars on a dark purple bg colour.

3. Currently struggling to get the image to follow the max width im stating, i am attempting to redo all of my media queries,
-   So it turns out i was doing the same mistake as my firs issue... so ugh thats embaressing

4. I had a massive amount of issues with finding resources to assist me in editing what image would be shown as the default for the API from APOD, as such I have it blank. I couldnt figure it out in time for my submission unfortunately

5. I had a hard time getting my code to pass the validator due to bad syntax, so i had to re write all of that

6. Validator found issues with me having tons of lines of extra code mixed into my work, such as list style types in the body as i was trying to remove old code and ended up with adding it in the wrong place.

7. With the new requirements listed, I now need to remove my "favourites.html page and need to build it into the index.html page

8. Experiencing an issue with the js file not finding anything under the name favouritesSection - though it should

9. My website is now working with both the favourites and the html,. though its just sittin at the bottom so now i am doing research to make them switch between the two whilst within a single file

10. Hi colin here... i lost my old file. so i had to recreate this whole thing. which sucked. using my skills i learned from my time working with php (oddly) I got more comfortable editing my css in one file (i dont know why I would be doing this in any other way, this is way easier)

11. Updating this favourite button was hard, 


_________________________________
<!-- RESOURCES USED FROM EXTERNAL SOURCES -->
1. The favourite icon empty is made by : Gregor Cresnar - https://www.flaticon.com/authors/gregor-cresnar
2. The favourite icon full is made by :  Freepik - https://www.freepik.com/
3. Background image is pulled from APOD -https://api.nasa.gov/ - key is listed within code
