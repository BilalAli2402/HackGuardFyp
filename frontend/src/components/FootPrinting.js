import React from 'react';

function FootPrinting({ isLoggedIn }) {
  return (
    <>
    <h1> FootPrinting
    </h1>
      <div>{isLoggedIn ? "Welcome back!" : "Welcome to our app!"}</div>
      <div><p>

      <div className='hacking-image'>
                <img src=' https://miro.medium.com/v2/resize:fit:400/1*KAoLVbsdxTQYY-oQWKATLQ.png'></img>
            </div>

      
<body>
    
    
    <h2>Understanding Footprinting</h2>
    
    <p>Footprinting is the process of gathering information about a target system, network, or organization with the aim of identifying vulnerabilities, and a potential attack surface. This information is crucial for planning and executing successful cyber attacks.</p>
    
    <h2>Methods</h2>
    
    <p>1. <strong>Passive Footprinting:</strong> In passive footprinting, the attacker gathers information without directly interacting with the target. This involves searching public records or social media for information about the target.</p>
    
    <p>2. <strong>Active Footprinting:</strong> Active footprinting involves actively interacting with the target system or network to gather information. This includes scanning for open ports and conducting DNS queries.</p>
    
    <h2>Types of Information Gathered</h2>
    
    <p>1. <strong>Domain Information:</strong> This includes information about the target organization's domain name, registrar, and DNS records.</p>
    
    <p>2. <strong>Network Topology:</strong> Footprinting may reveal details about the target's network infrastructure, including IP addresses, subnets, and network devices.</p>
    
    <p>3. <strong>Employee Information:</strong> Attackers may gather information about employees, including names, email addresses, job titles, and contact information, which can be used for social engineering attacks.</p>
    
    <p>4. <strong>System Architecture:</strong> Footprinting may uncover details about the target's operating systems, software versions, and network services, helping attackers identify potential vulnerabilities.</p>
    
    <h2>Tools and Techniques</h2>
    
    <p>1. <strong>Search Engines:</strong> Search engines like Google can be used to discover information about the target, such as websites, subdomains, and publicly accessible documents.</p>
    
    <p>2. <strong>WHOIS Lookup:</strong> WHOIS databases provide information about domain registrations, including the domain owner's contact details and registration dates.</p>
    
    <p>3. <strong>Network Scanning:</strong> Tools like Nmap can be used to scan the target network for open ports, services, and vulnerabilities.</p>
    
    <p>4. <strong>Social Engineering:</strong> Social engineering techniques, such as phishing emails or pretexting phone calls, can be used to gather information from employees or gain access to sensitive data.</p>
    
    <h2>Defending Against Footprinting</h2>
    
    <p>To defend against footprinting attacks, organizations should regularly monitor their online presence, restrict access to sensitive information, and implement security measures such as firewalls, intrusion detection systems, and access controls.</p>
    
    <p>By understanding the basics of footprinting, including the methods used, types of information gathered, and tools and techniques employed by attackers, organizations can better protect themselves against cyber threats and maintain the security of their systems and networks.</p>
</body>
      </p></div>
    </>

  );
}

export default FootPrinting;
