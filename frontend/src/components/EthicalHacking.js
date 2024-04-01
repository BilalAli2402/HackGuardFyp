import React from 'react';
import './EthicalHacking.css'

function EthicalHacking({ isLoggedIn }) {
    return (
        <>
            <h1> What is Ethical Hacking</h1>
            
            
            <ul>
            <h2>Understanding Ethical Hacking</h2>
    
    <p>Ethical hacking, also known as penetration testing or white-hat hacking, is the practice of testing computer systems, networks, or applications to identify security vulnerabilities. This process is conducted with the permission of the owner, with the goal of improving the security posture of the system.</p>
    
    <h2>Types of Hackers</h2>
    
    <p>1. <strong>White-Hat Hackers:</strong> Also known as ethical hackers, these individuals use their skills to uncover vulnerabilities and improve security. They work within legal boundaries and with explicit permission.</p>
    
    <p>2. <strong>Black-Hat Hackers:</strong> These hackers engage in illegal activities, such as unauthorized access to systems, stealing data, or causing damage for personal gain.</p>
    
    <p>3. <strong>Grey-Hat Hackers:</strong> Grey-hat hackers operate in a morally ambiguous space, sometimes performing unauthorized actions but without malicious intent. They may breach security for curiosity or to expose vulnerabilities.</p>
    
    <h2>Steps in Ethical Hacking</h2>
    
    <p>1. <strong>Reconnaissance:</strong> This phase involves gathering information about the target system or network, including IP addresses, domain names, and network topology.</p>
    
    <p>2. <strong>Scanning:</strong> In this step, the hacker uses tools to discover open ports, services running on those ports, and potential vulnerabilities in the target system.</p>
    
    <p>3. <strong>Enumeration:</strong> During enumeration, the hacker actively interacts with the target system to gather more detailed information, such as user accounts, shares, and system configuration.</p>
    
    <p>4. <strong>Exploitation:</strong> Once vulnerabilities are identified, the hacker attempts to exploit them to gain unauthorized access to the system or network.</p>
    
    <p>5. <strong>Post-Exploitation:</strong> In this phase, the hacker consolidates their control over the target system, escalating privileges, installing backdoors, and maintaining access for future exploitation.</p>
    
    <h2>Types of Attacks</h2>
    
    <p>1. <strong>Phishing:</strong> Attackers use deceptive emails or websites to trick users into revealing sensitive information, such as passwords or credit card numbers.</p>
    
    <p>2. <strong>SQL Injection:</strong> This attack involves injecting malicious SQL code into a web application's input fields to manipulate the database or execute malicious commands.</p>
    
    <p>3. <strong>DDoS (Distributed Denial of Service):</strong> Attackers flood a target system or network with large amounts of traffic causing it to crash and interrupt its service.</p>
    
    <p>4. <strong>Man-in-the-Middle (MITM):</strong> In this attack, the attacker intercepts communication between two parties to eavesdrop on or manipulate sensitive information.</p>
    
    <p>5. <strong>Brute Force:</strong> Attackers use automated tools to systematically try all possible combinations of passwords until the correct one is found, gaining unauthorized access to a system or account.</p>
    
    <p>By understanding the basics of ethical hacking, including the different types of hackers, steps involved, and common attack methods, individuals and organizations can better protect themselves against cyber threats.</p>
            </ul>

            <div className='hacking-image'>
                <img src='https://d30i16bbj53pdg.cloudfront.net/wp-content/uploads/2021/02/ethical-hacking-web.jpeg'></img>
            </div>


            <div><p>
              
            </p></div>
        </>

    );
}

export default EthicalHacking;