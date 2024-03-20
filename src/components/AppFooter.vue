<template>
    <footer class="footer">
      <div class="container">
        <div class="row ">
          <div class="col-md-4">
            <h5 class="mb-4">Informazioni</h5>
            <p>Email: info@deliveboo.com</p>
            <p>Telefono: +1234567890</p>
          </div>
          <div class="col-md-4">
            <h5 class="mb-4">Esplora</h5>
            <ul>
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/restaurants">Ristoranti</router-link></li>
              <li><router-link to="/fooditems">Piatti</router-link></li>
              <li><router-link to="/contact">Contatti</router-link></li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <p class="pt-5">© 2024 Deliveboo, Tutti i diritti riservati</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  }
  </script>
  
  <style lang="scss" scoped>
  .footer {
    height: 300px;
    width: 100%;
    background-color: #57D0FF;
    color: white;
    padding: 30px 0;
  }
  
  .footer h5 {
    color: #fff;
  }
  
  .footer ul {
    list-style: none;
    padding-left: 0;
  }
  
  .footer ul li {
    margin-bottom: 10px;
  }
  
  .footer ul li a {
    color: white;
  }
  
  .social-icons li {
    display: inline-block;
    margin-right: 10px;
  }
  
  .social-icons li a {
    color: white;
    font-size: 20px;
  }
  </style>