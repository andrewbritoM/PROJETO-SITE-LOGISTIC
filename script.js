* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #111;
  font-family: Arial, sans-serif;

  display: flex;
  justify-content: center;

  min-height: 100vh;
}

.app {
  width: 100%;
  max-width: 1200px;

  background: #ff3131;

  min-height: 100vh;

  padding: 30px;

  color: white;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;

  font-size: 24px;
  font-weight: bold;
}

.route-btn {
  background: #d9ff9e;
  border: none;

  padding: 14px 24px;

  border-radius: 6px;

  cursor: pointer;

  font-weight: bold;
}

.hero h1 {
  font-size: 60px;
  margin-bottom: 15px;
}

.hero p {
  font-size: 24px;
  color: #ffd4d4;

  margin-bottom: 50px;
}

.search-box {
  margin-bottom: 60px;
}

.search-box input {
  width: 100%;
  max-width: 500px;

  padding: 18px;

  border: none;
  border-radius: 8px;

  background: #d9ff9e;

  font-size: 16px;
}

.offers h3 {
  margin-bottom: 25px;
}

.cards {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

  gap: 20px;

  margin-bottom: 50px;
}

.card {
  background: rgba(255,255,255,0.2);

  padding: 40px 20px;

  border-radius: 12px;

  text-align: center;

  transition: 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card i {
  font-size: 40px;

  margin-bottom: 20px;
}

.links {
  display: flex;
  gap: 25px;

  margin-bottom: 40px;

  flex-wrap: wrap;
}

.links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.map-area {
  margin-bottom: 40px;
}

.map-area img {
  width: 100%;

  border-radius: 14px;

  border: 4px solid rgba(255,255,255,0.2);
}

.result-section {
  margin-top: 30px;
}

.calculate-btn {
  width: 100%;

  padding: 18px;

  border: none;

  background: #111;

  color: white;

  border-radius: 10px;

  font-size: 18px;

  font-weight: bold;

  cursor: pointer;

  margin-bottom: 20px;

  transition: 0.3s;
}

.calculate-btn:hover {
  background: #222;
}

.resultado {
  background: rgba(255,255,255,0.15);

  padding: 25px;

  border-radius: 12px;

  line-height: 2;

  font-size: 18px;
}

@media(max-width: 768px) {

  .hero h1 {
    font-size: 42px;
  }

  .hero p {
    font-size: 18px;
  }

  .topbar {
    flex-direction: column;
    gap: 20px;
  }

}
