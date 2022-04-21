import React from 'react';
import './Home.css';



function Home(){
    return(
        <div >
        <div class="homeTopContainer">
            <h1>
                Hospital Management
            </h1>
        <p>Asad Ali, Vivian Zheng, David Fasina, Mahirah Samah</p>
        </div>
        <div class="homebox1">
            <section class="homesection">
                <h2>Project Objective</h2>
                <p>Our system is a Hospital managment system that handles patients and doctors/nurses.</p>
            </section>
        </div>
        <div class="parent">
          <div class="child1">
            <section class="section">
                <h2>Project Information</h2>
                <p>This website requires that the user either already have an existing account or create an account in order to access the contents inside it. Some content is hidded based on what the users credentials are and whether they are eligible to access the content.</p>
            </section>
          </div>
          <div class="child2">
              
          </div>
        </div>
    </div>
    );
}

export default Home;

