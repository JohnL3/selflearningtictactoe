# Self Learning Tic Tac Toe

#### About this project
I choose to do this as a way to work on problem solving.  
It is intended as something for me to work at now and again as an ongoing project.  
I have created a Tic Tac Toe game and wanted to challange myself to see if I could improve on it.
This is when I thought of the idea of creating a Tic Tac Toe game that could teach itself or you could teach it not to loose.
### Instructions
+ As this is a work in progress You will ALWAYS have to choose X from the choose you side option .... and ALWAYS choose O from the choose who starts option
+ After each game you HAVE TO REPEAT THIS so that the computer starts first
+ Anywhere you see p1 ... p1 refers to player one Human
+ Anywher you see p2 ... p2 refers to player two computer
+ For computer to learn its self dont fill in the input boxes .... and just play the game ... over and over ... when it looses a game it will when it comes across these moves played again adjust its moves so as not to loose
+ If you want to speed up the process you can pick which move the computer makes to start with by entering a number from 1-9 in the P2 1st move input box. The computer will always start with that move until you change the value in the input or clear the value from the input. If you clear the value the computer will choose a random start move.
+ The P2 2nd move index option is to choose the computers second move .... you use an index number for this eg ... comp chooses 1 as first move and you as player are going to choose 7 for you first moves leaving 2,3,4,5,6,8,9 for computer to choose from for second move ... setting P2 2nd move index to 0 means computer will pick 2 for his second move
+ Using the P2 1st move input and P2 2nd move index input means you can find the loosing moves quicker and teach tic tac toe not to loose quicker. 
+ When you loose a game dont change the P2 1st move input and P2 2nd move index .... start game again and when you rerun it you will see it will choose a different move and update its game data for that move. From now on it will never loose to that play again. Now you can adjust the P2  2nd move index to test for more lossing games for the P2 1st move choice.
+ When you have all indexs checked you can then change the P1 1st move to another number and repeat everything again
+ Other items on screen are just visual aids to help me see what is going on eg data in boxes on right show data for a loosing game, and when a move is learned it shows in red, so I can tell visually it is working
+ Other displays shows quantity of wins losses and draws for each player
+ Comp second moves and comp third moves just show the move choices available at each move .... this helps me visualize the changes when computer learns and i can see the choices changing  
### Changes needed to how it learns
+ The program is working exactly as I have programmed it to do, but I have just found something which I need to improve on as I had not seen or thought of when I was coming up with a way for the computer to learn.  
The way it learns is pretty simple ... if it looses a game it checks for a forced move , it then changes the move used previous to the forced move. And adds the move it deemed to have lost with to a list of moves not to use in this situation in future.  
  + A forced move is where a human has a move available on next play to win game, and computer has to choose that move to block human from winning ... in situations where computer looses human has two moves available next play and computer can only block one. 
  
+ This works fine for when it changes second moves that have been the cause of it loosing.  
But for third moves that are the cause of it loosing it dose the same ... and while this works I realized this needs to be modified for the third moves as there is a slight difference to what goes on for third moves compared to second moves.  
And this will remove a small amount of move choices that are only bad for some moves but not others, and I want to try to only remove as few mvoes as possible.  

### Update on changes needed
Have adjusted the javascript code to sort out the above third moves problem. Initial test are showing it works and I will do further tests to make sure.

### Things Id like to Add
+ First a option to store data so when I shut down webpage or refresh I dont loose the data allready created  
So I will either have to connect to a database or look in to local storage.
+ Look at doing the learning option as well for when computer goes second and human starts
+ Would Really like to see if I can have two versions play against each other and learn as they go along.  Bonus as this could speed up the learning process, And also I have a feeling learning results could be different to if I taught them.
+ A total redesign of the whole webpage ... as this was just thrown to-gether as i thought of things that would help me visualize what was happening as I working away at this.

### Changes since Initial commit
1. Worked on and improved the learning code section
2. Added another input box for (comp) P2 3rd move ... this makes checking for bad moves here quicker as before I would have to wait on a random function to choose a move which i can now force tic tac toe to pick.
