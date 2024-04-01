import React from 'react';

function Home({ isLoggedIn }) {
  return (
    <>
    <h1> HOME PAGE
    </h1>
      <div>{isLoggedIn ? "Welcome back!" : "Welcome to our app"}</div>
      <div><p>
      <body>
    <h1>Welcome to HackGuard </h1>
    
    <p>Welcome to a world where cybersecurity meets ethical hacking, where the lines between attacker and defender blur, and where knowledge is the most valuable weapon of all. Ethical hacking isn't just about breaking into systems; it's about understanding how they work, how they can be compromised, and, most importantly, how they can be defended.</p>
    
    <h2>What is Ethical Hacking?</h2>
    
    <p>Ethical hacking, also known as penetration testing or white-hat hacking, is where you gain permission from the target to carry out an attack on the system. This is done to help identify vulnerabilities and help the target find out where they need to imrpove their defence</p>
    
   
    <h2>Our Mission</h2>
    
    <p>At HackGuard our aim is to educate individuals and organizations about the importance of ethical hacking, some ways information can be gathered without you even realising, and how to defend against these attacks.</p>
    
    <h2>What You'll Find Here</h2>
    
    <p>On this website, you'll find  information on ethical hacking,social engineering and footprinting. You will also have a quiz where you can test the knowledge you have learnt and see if you could defend an attack!</p>
    
    
</body>
<div className='hacking-image'>
                <img src='https://images.cointelegraph.com/cdn-cgi/image/format=auto,onerror=redirect,quality=90,width=550/https://s3.cointelegraph.com/uploads/2023-03/7c21745f-b859-4f64-bc47-50bd23c6965e.jpg'></img>
            </div>

      </p></div>
    </>

  );
}

export default Home;