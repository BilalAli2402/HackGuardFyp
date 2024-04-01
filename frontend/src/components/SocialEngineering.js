import React from 'react';

function SocialEngineering({ isLoggedIn }) {
  return (
    <>
    <h1> SocialEngineering
    </h1>
      <div>{isLoggedIn ? "Welcome back!" : "Welcome to our app!"}</div>
      <div></div>

      <body>
    <h1>Social Engineering</h1>
    
    <h2>Understanding Social Engineering</h2>
    
    <p>Social engineering is the art of manipulating people into performing actions or divulging confidential information. Unlike traditional hacking methods that rely on technical vulnerabilities, social engineering exploits human psychology and behavior to achieve its objectives.</p>
    
    <h2>Types of Social Engineering Attacks</h2>
    
    <p>1. <strong>Phishing:</strong> Attackers use deceptive emails or websites to trick individuals into revealing sensitive information, such as passwords or financial details.</p>
    
    <p>2. <strong>Pretexting:</strong> In pretexting, attackers create a fabricated scenario or pretext to trick individuals into providing information or performing actions they wouldn't normally do.</p>
    
    <p>3. <strong>Baiting:</strong> Baiting involves enticing victims with something desirable, such as a free download or USB drive, that contains malware or malicious software.</p>
    
    <p>4. <strong>Impersonation:</strong> Attackers may impersonate legitimate individuals or organizations, such as tech support personnel or company executives, to gain trust and extract information.</p>
    
    <h2>Defense Mechanisms</h2>
    
    <p>1. <strong>Security Awareness Training:</strong> Educating employees and individuals about the dangers of social engineering and how to recognize and respond to suspicious requests can help mitigate the risk of successful attacks.</p>
    
    <p>2. <strong>Strict Access Controls:</strong> Limiting access to sensitive information and systems through strong authentication mechanisms and access controls can reduce the impact of social engineering attacks.</p>
    
    <p>3. <strong>Multi-Factor Authentication:</strong> Implementing multi-factor authentication (MFA) adds an extra layer of security by requiring additional verification beyond passwords, making it harder for attackers to gain unauthorized access.</p>
    
    <p>4. <strong>Incident Response Plans:</strong> Having robust incident response plans in place can help organizations and individuals detect and respond to social engineering attacks effectively, minimizing their impact and preventing further damage.</p>
    
    <h2>Human Defenses for Individuals</h2>
    
    <p>1. <strong>Critical Thinking:</strong> Individuals should be skeptical of unsolicited requests for personal information or offers that seem too good to be true. Questioning the legitimacy of requests and verifying the identity of the requester can help prevent falling victim to social engineering attacks.</p>
    
    <p>2. <strong>Privacy Settings:</strong> Regularly review and adjust privacy settings on social media platforms and other online accounts to limit the amount of personal information available to potential attackers.</p>
    
    <p>3. <strong>Strong Passwords:</strong> Use strong, unique passwords for online accounts and avoid sharing them with others. Consider using a password manager to securely store and manage passwords.</p>
    
    <p>4. <strong>Trust Your Instincts:</strong> If something feels off or suspicious, trust your instincts and proceed with caution. Don't hesitate to seek advice or assistance from trusted sources if you're unsure about a request or situation.</p>
    
    <h2>Conclusion</h2>
    
    <p>Social engineering attacks continue to pose a significant threat to organizations and individuals alike. By understanding the basics of social engineering, recognizing common attack techniques, and implementing appropriate defense mechanisms, both organizations and individuals can better protect themselves against these insidious threats and safeguard their sensitive information.</p>

    <div className='hacking-image'>
                <img src=' https://assets.f-secure.com/i/illustrations/what-is-social-engineering.svg'></img>
            </div>

</body>
    </>

  );
}

export default SocialEngineering;