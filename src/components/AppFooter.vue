<template>
    <footer class="footer mt-5">
      <div class="container">
        <div class="row d-flex justify-content-between">
          <div class="col-md-4 text-center">
            <h5 class="mb-4 text-uppercase">Informazioni</h5>
            <p>Email: info@deliveboo.com</p>
            <p>Telefono: +1234567890</p>
          </div>
          <div class="col-3 text-center">
            <img class="footer-img rounded-circle z-0" src="/Logo_Deliveboo.jpg" alt="Jumbo immagine">
          </div>
          <div class="col-md-4 text-center">
            <h5 class="mb-4 text-uppercase">Esplora</h5>
            <ul>
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/restaurants">Ristoranti</router-link></li>
              <li><router-link to="/fooditems">Piatti</router-link></li>
              <li><router-link to="/contact">Contatti</router-link></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="w-100 text-center">
        <p class="pt-4"><small>© 2024 Deliveboo, Tutti i diritti riservati</small></p>
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
    text-decoration: none;
  }

  .footer ul li a:hover {
    color: rgb(91, 145, 245);
    scale: 1.1;
    transition: .2s;
  }
  
  .social-icons li {
    display: inline-block;
    margin-right: 10px;
  }
  
  .social-icons li a {
    color: white;
    font-size: 20px;
  }

  .footer-img{
    width: 200px;
    height: 200px;
  }
  </style>