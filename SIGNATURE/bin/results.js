const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let numChambers = params.chambers?params.chambers:3;
console.log(`Number of chambers omn queryString: ${numChambers}`);

//reeds
const reedBaseSq = 12;
const reedWidth = 8;
const rivetRadius = 3;
//reed plates
const height = 120;  //284
const edge = 110;
const chamberWidth = 47;

//comb
const holeWidth = 59;
const edgeWidth = 115;

function createReedplateFace(svg, numHoles) {

    let rp = document.getElementById(svg);
    //width="820" height="10" viewBox="0 0 820 10"
    let width = (edgeWidth * 2) + (numHoles * 59);   //230 + 590
    rp.setAttribute("width", width);
    rp.setAttribute("height", "10");
    rp.setAttribute("viewBox", "0 0 " + width + " 10");

    const newRect = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );

    newRect.setAttribute("x", "0");
    newRect.setAttribute("y", "0");
    newRect.setAttribute("width", width );
    newRect.setAttribute("height", "10");
    newRect.setAttribute("stroke", "black");
    newRect.setAttribute("fill", "transparent");
    newRect.setAttribute("stroke-width", "1");

    rp.appendChild(newRect);

}

function createBlowReedplate(svg, numHoles, arrTune) {

    const svgOld = document.getElementById("dyn");
    //svgOld.remove();

    // create the svg element
    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    let width = ((edge * 2) + ( numHoles * chamberWidth) - chamberWidth + reedBaseSq);

    // set width and height?
    //set viewBox
    svg1.setAttribute("viewBox", "0 0 " + width + " " + height);

    const newRect = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );

    // the plate
    newRect.setAttribute("id", "dyn");
    newRect.setAttribute("x", "0");
    newRect.setAttribute("y", "0");
    newRect.setAttribute("width", width );
    newRect.setAttribute("height", height);
    newRect.setAttribute("stroke", "black");
    newRect.setAttribute("fill", "transparent");


    svg1.appendChild(newRect);

    document.getElementById(svg).appendChild(svg1);

    let start = edge;


    for (let i = 1; i <= numHoles; i++) {
      console.log(`----${i}----`);
      console.log(`start: ${start}`);
      createBlowReed(svg,svg1,i,numHoles, start, arrTune[i-1]);
      start += chamberWidth;
      console.log(`chamberWidth: ${chamberWidth} start: ${start}`);
    }


 }



 function createBlowReed(svg,svg1, holeNum, numHoles, start, tuneReed) {

    const b_reed = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );

    const b_section = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );

    // create a circle
    const rivet = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );

    let y = 8 + (height/4) - ( 0 - (((height/4)/numHoles) * holeNum));
    let h = (((height/2)) - (((height/4)/numHoles) * holeNum));
    b_reed.setAttribute("x",  start + 2);      //(holeNum * 32) + 23 + 2 ); //57 - 2 is the reed base offset, 23 is the margin offset, 32 is the chamber width
    b_reed.setAttribute("y", y); //38  96-38    120-60-12-10  width of plate - len of reed - base - 10
    b_reed.setAttribute("width", reedWidth);
    b_reed.setAttribute("height", h);
    b_reed.setAttribute("stroke", "black");
    b_reed.setAttribute("fill", tuneReed==0?"green":"transparent");

    if (tuneReed>0) {
      b_section.setAttribute("x",  start + 2);
      b_section.setAttribute("y", y);
      b_section.setAttribute("width", reedWidth);
      b_section.setAttribute("height", h/2);
      b_section.setAttribute("fill", "red");
      svg1.appendChild(b_section);
    } else if (tuneReed<0) {

      b_section.setAttribute("x",  start + 2);
      b_section.setAttribute("y", y+(h/2));
      b_section.setAttribute("width", reedWidth);
      b_section.setAttribute("height", h/2);
      b_section.setAttribute("fill", "red");
      svg1.appendChild(b_section);
    }


    rivet.setAttribute("cx", start + 6); //(holeNum * 32) + 23 + 6 ); //61 - 6 is the reed base offset, 23 is the margin offset, 32 is the chamber width-  to the center
    rivet.setAttribute("cy", "104"); //120-6- 10     width of plate - 1/2 of base  to center of circle
    rivet.setAttribute("r", rivetRadius);
    rivet.setAttribute("stroke", "black");
    rivet.setAttribute("fill", "transparent");


    // attach it to the container
    //svg1.appendChild(newRect);
    svg1.appendChild(b_reed);


    //svg1.appendChild(base);
    svg1.appendChild(rivet);

    // attach container to document
    document.getElementById(svg).appendChild(svg1);

}



function createDrawReedplate(svg, numHoles, arrTune) {

    //TODO
    //need to assert that the size of the arrTune == numHoles

    // create the svg element
    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    let width = ((edge * 2) + ( numHoles * chamberWidth) - chamberWidth + reedBaseSq);

    // set width and height?
    //set viewBox
    svg1.setAttribute("viewBox", "0 0 " + width + " " + height);

    const newRect = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );

      // the plate
      newRect.setAttribute("x", "0");
      newRect.setAttribute("y", "0");
      newRect.setAttribute("width", width);
      newRect.setAttribute("height", height);
      newRect.setAttribute("stroke", "black");
      newRect.setAttribute("fill", "transparent");

    svg1.appendChild(newRect);

    document.getElementById(svg).appendChild(svg1);


    // for (let i = 1; i <= numHoles; i++) {
    //   createDrawReed(svg,svg1,i,numHoles);
    // }

    let start = edge;
    //let chamberWidth = (width - (start+(start/2))-4)/numHoles;

    for (let i = 1; i <= numHoles; i++) {
      console.log(`----${i}----`);
      console.log(`start: ${start}`);
      createDrawReed(svg,svg1,i,numHoles, start, arrTune[i-1]);
      start += chamberWidth;
      console.log(`chamberWidth: ${chamberWidth} start: ${start}`);
    }
}

function createDrawReed(svg, svg1, holeNum, numHoles, start, tuneReed) {

  const b_reed = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect",
  );

  const b_section = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect",
  );

  const base = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect",
  );

  // let y = 8 + (height/4) - ( 0 - (((height/4)/numHoles) * holeNum));
  // let h = (((height/2)) - (((height/4)/numHoles) * holeNum));

  let y = 22;
  let h = 60 - ((30/numHoles) * holeNum);

  //the reed
  b_reed.setAttribute("x", start + 2);//(holeNum * 32) + 23 + 2 ); //57 - 2 is the reed base offset, 23 is the margin offset, 32 is the chamber width
  b_reed.setAttribute("y", y); // base + 10
  b_reed.setAttribute("width", reedWidth);
  b_reed.setAttribute("height", h ); // 60 30/10 = 3  63 - 3 = 60   63 - 30 = 33    60 - ()(30/numHoles) * holeNum) = 1.5 *
  b_reed.setAttribute("stroke", "black");
  b_reed.setAttribute("fill", tuneReed==0?"green":"transparent");

  if (tuneReed>0) {
    b_section.setAttribute("x",  start + 2);
    b_section.setAttribute("y", y);//8 + (height/4) - ( 0 - (((height/4)/numHoles) * holeNum)));
    b_section.setAttribute("width", reedWidth);
    b_section.setAttribute("height", h/2);// (((height/2)) - (((height/4)/numHoles) * holeNum))/2);
    b_section.setAttribute("fill", "red");
    svg1.appendChild(b_section);
  } else if (tuneReed<0) {
    b_section.setAttribute("x",  start + 2);
    b_section.setAttribute("y", y+(h/2));//8 + (height/4) - ( 0 - (((height/4)/numHoles) * holeNum)));
    b_section.setAttribute("width", reedWidth);
    b_section.setAttribute("height", h/2);// (((height/2)) - (((height/4)/numHoles) * holeNum))/2);
    b_section.setAttribute("fill", "red");
    svg1.appendChild(b_section);
  }

  //the reed base
  base.setAttribute("x", start);//(holeNum * 32) + 23 ); //55 - no reed base offset, 23 is the margin offset, 32 is the chamber width-  //we base the left side on the firstest point left- the reed base
  base.setAttribute("y", 82 + ( 0 - ((30/numHoles) * holeNum))); //80
  base.setAttribute("width", reedBaseSq);
  base.setAttribute("height", reedBaseSq);
  base.setAttribute("stroke", "black");
  base.setAttribute("fill", "transparent");

  // create a circle
  const rivet = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );
  rivet.setAttribute("cx", start + 6); //(holeNum * 32) + 23 + 6 ); //61 - 6 is the reed offset, 23 is the margin offset, 32 is the chamber width-  to the center
  rivet.setAttribute("cy", 88 + ( 0 - ((30/numHoles) * holeNum))); //120-4-20 to center of circle
  rivet.setAttribute("r", rivetRadius);
  rivet.setAttribute("stroke", "black");
  rivet.setAttribute("fill", "white");


  // attach it to the container
  //svg1.appendChild(newRect);
  svg1.appendChild(b_reed);
  svg1.appendChild(base);
  svg1.appendChild(rivet);

  // attach container to document
  document.getElementById(svg).appendChild(svg1);
}



function renderComb(numChambers) {

  numChambers -= 2; //substrace the left and right edges
  const parent = document.getElementById("comb");
  const last = document.getElementById("last");
  for (let x = 0; x < numChambers; x++) {
    var centerComb = document.createElement('div');
    centerComb.setAttribute("class", "fixed");
    centerComb.setAttribute("style","background-image: url('images/line-drawings/CenterComb.svg')");
    //<div class="fixed" style="background-image: url('images/line-drawings/CenterComb.svg');"></div>
    parent.insertBefore(centerComb, last)
  }
}

function sizeCover(numChambers,elementId) {
  numChambers -= 2; //compensate for left and right homes
  const center = document.getElementById(elementId);
  center.setAttribute(`style`,`width:${numChambers*59}px;background-image: url('images/line-drawings/TopCoverCenter.svg')`);
}

function renderHarp(tuneArray) {

  let numChambers = tuneArray[0].length;

  sizeCover(numChambers,"top-cover-center");
  createBlowReedplate("mySVGtop-p", numChambers,tuneArray[0]);
  createReedplateFace("mySVGtop", numChambers);
  renderComb(numChambers);
  createReedplateFace("mySVGbtm", numChambers);
  createDrawReedplate("mySVGbtm-p", numChambers,tuneArray[1]);
  sizeCover(numChambers,"bottom-cover-center");
}



let tuneArray = [[0,1,0,-1,0,0,-1,-1,1,1],[0,-1,-1,1,0,0,0,-1,0,0]]

//let tuneArray = [[-1,1,0,0,1,1,-1,0,-1,1,0,1],[1,-1,0,0,1,1,1,-1,1,0,1,1]]

//let tuneArray = [[-1,1,0,0,1,1],[1,-1,1,0,1,1]]

renderHarp(tuneArray);
