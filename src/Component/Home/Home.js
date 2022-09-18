import React, { useEffect } from 'react';
import Gamearea from './Gamearea/Gamearea';
import { useState } from 'react';
import './Home.css'
import {useStateValue} from '../../StateProvider'


function Home() {

  const[{ basket }, dispatch] = useStateValue();
    const [xco, setxco] = useState(0);
    const [yco, setyco] = useState(0);
    const [positionx, setpositionx] = useState("");
    const [positiony, setpositiony] = useState("");
    const [jellydir, setjellydir] = useState("");
    const [direction, setdirection] = useState("");
    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);
    var start = 1;
    var end = 1;

    function refreshPage() {
      window.location.reload(false);
    }

    const handleSubmit = (e) => {// this function collects all the values from the 
      //form and stores it in a list and call the help function to process it and store the ans in another list
            e.preventDefault();
      console.log(positionx,positiony,jellydir, direction,xco,yco);
      const jellifishTrack = {positionx,positiony,jellydir,direction}
      if(positionx&&positiony&&jellydir&&direction){
        setList((ls)=> [...ls,jellifishTrack])
        setpositionx("")
        setpositiony("")
        setjellydir("")
        setdirection("")
      }
   
      let ans = help(xco,yco,positionx, positiony,jellydir, direction);
      console.log(ans);
      if(ans){
        setList2((ls) => [...ls,ans])
      }
    }
    const help2 = (pathx, pathy) => {// this function takes the edges from which the jellyfish falls and stores it in an internal data layer
      dispatch({
        type: "ADD_TO_BASKET",
        item : {
            pathx : pathx,
            pathy : pathy

        } });


    }

    const help3 = (pathx, pathy) => {// this function checks that for any given point is it already 
      //present in the data layer so as skip the command of jumping from the same point.
      for(let i =0; i < basket?.length; i++){
        let tempx = basket[i].pathx;
        let tempy = basket[i].pathy;
        if(tempx == pathx && tempy == pathy)
        {
          return true;
        }
      }
      return false;
    }

    const help = (xco,yco,positionx, positiony,jellydir, direction) => { // this function is doing the main processing of path of single jellyfish and returns the direction
     
      let currx = positionx;
      let curry = positiony;
      let currdir = jellydir;
      let dirnum ;
      let pathx = currx;
      let pathy = curry;
      if(currdir === 'E'){
        dirnum = 2;
      }if(currdir === 'N'){
        dirnum = 1;
      }if(currdir === 'S'){
        dirnum = 3;
      }if(currdir === 'W'){
        dirnum = 4;
      }
      console.log("currx:" + currx + ",curry :"+ curry + " dirnum" + dirnum +",currdir :" + currdir + ",pathx:" + pathx + " ,pathy:" + pathy);
      if(!(0 <= currx <= xco)){
        return positionx + positiony + jellydir + "LOST";
      }
      if(!(0 <= curry <= yco)){
        return  positionx + positiony + jellydir + "LOST";
      }
     let flag = false;
      let pathlength = direction.length ;
      let pointer =0;
       while(pathlength--){
        if('F' ===  direction.substring(pointer,pointer+1)){

          if(dirnum === 1){
            
             if( pathy >= yco){
              let check = help3(pathx,pathy)
              if(check ){
               console.log('yeha se continue hua ha');
                 pointer++;
                 continue;
               }
               help2(pathx, pathy);
              
              return pathx.toString() + pathy.toString()  + 'N' + 'LOST';
            }else{
              pathy++;
              console.log(pathy);
              
            }
          } if(dirnum === 2){
           
            if( pathx >= xco){
              let check = help3(pathx,pathy)
              if(check ){
               console.log('yeha se continue hua ha');
                 pointer++;
                 continue;
               }
               help2(pathx, pathy);
              
              
              return pathx.toString() + pathy.toString() + 'E'+ 'LOST';
            }else{
              pathx++;
              console.log(pathx);
            }
          } if(dirnum === 3){
           
            if( pathy <= 0){
              let check = help3(pathx,pathy)
              if(check ){
               console.log('yeha se continue hua ha');
                 pointer++;
                 continue;
               }
               help2(pathx, pathy);
              
              return pathx.toString() + pathy.toString() + 'S' + 'LOST';
            }else{
              pathy--;
              console.log(pathy);
              
            }
          } if(dirnum === 4){
            
            if( pathx <= 0){
              let check = help3(pathx,pathy)
              if(check ){
               console.log('yeha se continue hua ha');
                 pointer++;
                 continue;
               }
               help2(pathx, pathy);
              
              
              return pathx.toString() + pathy.toString()  + 'W'+ 'LOST';
            }else{
              pathx--;
              console.log(pathx);
            }
          }
          }else if ('R' ===  direction.substring(pointer,pointer+1)){
              if(dirnum === 4 ){
                dirnum = 1;
              }else{
                dirnum++;
              }

          }else if ('L' ===  direction.substring(pointer,pointer+1)){

            if(dirnum === 1 ){
              dirnum = 4;
            }else{
              dirnum--;
            }

        }
        pointer++;
       }
       console.log("currx: " + currx + ",curry: "+ curry + ",currdir:" + currdir + ",pathx:" + pathx + ",pathy:" + pathy + ",pointer:" + pointer);
    
       if(dirnum === 2){
        return pathx.toString() + pathy.toString() + 'E';
      }if(dirnum === 1){
        return pathx.toString() + pathy.toString() + 'N';
      }if( dirnum === 3){
       return pathx.toString() + pathy.toString() + 'S';
      }if(dirnum === 4){
        return pathx.toString() + pathy.toString() + 'W';
      }

    }
   
  return (
    <div className='home' >
   
      <form className='home__form' onSubmit={handleSubmit}>
      <span className='home__form__text'>This is a jellyfish game. The rules of the game are simple you have enter the x and y co-ordinate
      for the top right corner of the tank  the bottom-left corner is fixed at (0,0).Then enter the starting point co-ordinates of 
      jellyfish and in the next line enter the direction the jellyfish is facing .Then enter how the  jellyfish has to move:
      Left(L): the jellyfish turns left 90 degrees and remains on the current grid point.
Right(R): the jellyfish turns right 90 degrees and remains on the current grid point.
Forward(F): the jellyfish moves forward one grid point in the direction of the current orientation and maintains the same orientation.
The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).Example is if "FFRFL" will make the jellyfish 
move forward 2 times then turn right and again move forward and then turn left.Since the grid is rectangular and bounded (...yes, the Jellyfish tank is a very flat tank), a jellyfish that moves “off” the edge of the grid is lost forever. However, lost jellyfish leave a “scent” that prohibits future jellyfish from dropping off the tank at the same grid point. The scent is left at the jellyfish's last grid position before disappearing over the edge. The current jellyfish simply ignores an instruction to 
move “off” the tank from a grid point from which a jellyfish has been previously lost. The second jellyfish co-ordinates can be entered after the first keeping the x, y co-ordinates of tank same. Abbreviations: Position : P,Path : Pa,Jellyfish : JF, Final position : FP.</span>
        <div className='home__form__text'><span>This is x-co-ordinate of Tank</span>
        <input className='home__form__input' name ="xco" placeholder ="x-co-ordinate" value = {xco} onChange = {(e) => setxco(e.target.value)}/></div>
        <div className='home__form__text'><span>This is y-co-ordinate of Tank</span>
        <input className='home__form__input' name ="yco" placeholder ="y-co-ordinate" value = {yco} onChange = {(e) => setyco(e.target.value)}/></div>
        <div className='home__form__text'><span>Enter the  positionx of jellfish </span>
        <input className='home__form__input' name ="positionx" placeholder ="Positionx" value = {positionx} onChange = {(e) => setpositionx(e.target.value)}/></div>
        <div className='home__form__text'><span>Enter the  positiony of jellfish </span>
        <input className='home__form__input' name ="positiony" placeholder ="Positiony" value = {positiony} onChange = {(e) => setpositiony(e.target.value)}/></div>
        <div className='home__form__text'><span>Enter the initial(N,S,E,W) direction of jellfish </span>
        <input className='home__form__input' name ="jellydir" placeholder ="Jellydir" value = {jellydir} onChange = {(e) => setjellydir(e.target.value)}/></div>
        <div className='home__form__text'><span>Enter the  path(F-forward,R-right,L-left)  of jellfish </span>
        <input className='home__form__input' name ="direction" placeholder ="Path" value = {direction} onChange = {(e) => setdirection(e.target.value)}/></div>
        <button className='home__form__button'>Get the Final path</button>
      </form>
      <button className='home__form__button' onClick={refreshPage}>Reset game</button>
      <div className='home__ans'>
      {//here we are outputing the data values here
        list.map((a) => <div className='home__form__text'>
          <li>P of {start} JF: ({a.positionx}, {a.positiony}) {a.jellydir}</li>
          <li>Pa of {start++}:{a.direction}</li>
          </div>)
          
      }
      {//Here the final output 
        list2.map((a) => <div className='home__form__text'>
          <li>FP of {end++} JF: {a}</li>
         
          </div>)
      }
  </div>
      
      
    </div>
  )
}

export default Home
