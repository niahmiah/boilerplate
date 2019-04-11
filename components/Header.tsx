import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const logoStyle = {
  marginBottom: '0.5em',
  fontSize: '2em'
}

const logoStyle1 = {
  color: '#000'
}

const logoStyle2 = {
  color: '#123'
}

const Header = () => (
  <div>
    <div style={logoStyle}>
      <span style={logoStyle1}>
        Brand
      </span>
      <span style={logoStyle2}>
        Name
      </span>
    </div>
    
    <div>
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/about">
        <a style={linkStyle}>About</a>
      </Link>
      <Link href="/documentation">
        <a style={linkStyle} target="_blank">API Docs</a>
      </Link>
    </div>
  </div>
);

export default Header;
