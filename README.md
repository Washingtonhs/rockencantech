# 🛍️ Rock Encantech — E-commerce com Autenticação

Catálogo de produtos com autenticação, desenvolvido com **Laravel + MySQL** no backend e **HTML + Bootstrap + jQuery** no frontend, totalmente containerizado com **Docker**.

---

## 🗂️ Estrutura do Projeto

```
rockencantech/
├── backend/                    # API Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── ProductController.php
│   │   │   │   └── CategoryController.php
│   │   │   ├── Resources/
│   │   │   │   ├── ProductResource.php
│   │   │   │   ├── ProductCollection.php
│   │   │   │   ├── CategoryResource.php
│   │   │   │   └── CategoryCollection.php
│   │   │   └── Traits/
│   │   │       └── ApiResponse.php
│   │   ├── Models/
│   │   ├── Repositories/
│   │   │   ├── Contracts/
│   │   │   ├── ProductRepository.php
│   │   │   └── CategoryRepository.php
│   │   ├── Services/
│   │   │   ├── ProductService.php
│   │   │   └── CategoryService.php
│   │   └── Providers/
│   │       └── AppServiceProvider.php  ← bind dos repositories
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/api.php
├── frontend/                   # HTML + Bootstrap + jQuery
│   ├── index.html              # Listagem de produtos
│   ├── product.html            # Detalhe do produto
│   ├── login.html              # Login
│   ├── register.html           # Cadastro
│   ├── css/style.css
│   └── js/
│       ├── api.js              # Comunicação com a API
│       ├── auth.js             # Gerenciamento de sessão
│       ├── products.js
│       ├── product-detail.js
│       ├── login.js
│       └── register.js
├── nginx/
│   └── default.conf            # Configuração Nginx → PHP-FPM
├── docker-compose.yml
└── README.md
```

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Docker](https://www.docker.com/) >= 24
- [Docker Compose](https://docs.docker.com/compose/) >= 2

### 🛠️ Tecnologias Utilizadas

- [Laravel 13x](https://laravel.com/)
- [jQuery 3x](https://jquery.com)
- [Bootstrap 5x](https://getbootstrap.com)

### 1. Clone o repositório

```bash
git clone https://github.com/Washingtonhs/rockencantech.git
cd rockencantech
```

### 2. Configure o ambiente do Laravel

```bash
cp backend/.env.example backend/.env
```

> O arquivo `.env.example` já está configurado para funcionar com o Docker Compose. Não é necessário alterar nada para rodar localmente.

### 3. Suba os containers

```bash
docker compose up -d --build
```

Aguarde todos os serviços iniciarem (especialmente o MySQL — pode levar ~30 segundos na primeira vez).

### 4. Instale as dependências e configure o Laravel

```bash
# Gera a APP_KEY
docker compose exec backend php artisan key:generate

# Roda as migrations
docker compose exec backend php artisan migrate

# Popula o banco com dados de exemplo
docker compose exec backend php artisan db:seed
```

### 5. Acesse a aplicação

| Serviço   | URL                          |
|-----------|------------------------------|
| Frontend  | http://localhost:8080        |
| API       | http://localhost:8000/api    |
| MySQL     | localhost:3306               |

---

## 👤 Usuário de teste (criado pelo Seeder)

| Campo  | Valor               |
|--------|---------------------|
| E-mail | admin@rock.com      |
| Senha  | Password@963        |
|--------|---------------------|
| E-mail | cliente@rock.com    |
| Senha  | Password@963        |

---

## 📡 Endpoints da API

### Autenticação

| Método | Endpoint          | Descrição              | Auth? |
|--------|-------------------|------------------------|-------|
| POST   | /api/register     | Cadastrar usuário      | ❌    |
| POST   | /api/login        | Login (retorna token)  | ❌    |
| POST   | /api/logout       | Logout                 | ✅    |
| GET    | /api/me           | Dados do usuário       | ✅    |

### Produtos

| Método | Endpoint              | Descrição                        | Auth? |
|--------|-----------------------|----------------------------------|-------|
| GET    | /api/products         | Listar produtos (paginado)       | ❌    |
| GET    | /api/products?category=1 | Filtrar por categoria         | ❌    |
| GET    | /api/products?search=x   | Buscar por nome/descrição     | ❌    |
| GET    | /api/products/{id}    | Detalhe de um produto            | ❌    |
| POST   | /api/products         | Criar produto                    | ✅    |
| PUT    | /api/products/{id}    | Atualizar produto                | ✅    |
| DELETE | /api/products/{id}    | Deletar produto                  | ✅    |

### Categorias

| Método | Endpoint              | Descrição              | Auth? |
|--------|-----------------------|------------------------|-------|
| GET    | /api/categories       | Listar categorias      | ❌    |
| GET    | /api/categories/{id}  | Detalhe da categoria   | ❌    |
| POST   | /api/categories       | Criar categoria        | ✅    |
| PUT    | /api/categories/{id}  | Atualizar categoria    | ✅    |
| DELETE | /api/categories/{id}  | Deletar categoria      | ✅    |

---

## 🏗️ Padrões de Design

### Repository Pattern
- `ProductRepository` / `CategoryRepository` — responsáveis exclusivamente pelo acesso ao banco de dados.
- Interfaces em `Repositories/Contracts/` — permitem trocar a implementação sem alterar os consumers.
- Injeção de dependência via `AppServiceProvider`.

### Service Layer
- `ProductService` / `CategoryService` — encapsulam a lógica de negócio.
- Consomem os Repositories; Controllers apenas delegam para os Services.

### Response Collection
- `ProductResource` / `CategoryResource` — formatam um único recurso.
- `ProductCollection` / `CategoryCollection` — formatam listas com `meta` (paginação) e `links`.
- Trait `ApiResponse` — padroniza todas as respostas `success`, `error`, `created`, `notFound`, etc.

---

## 🛑 Parar os containers

```bash
docker compose down
```

Para remover também o volume do banco de dados:

```bash
docker compose down -v
```

