
## /users
| route | req | success | statuses | params | body | fail | access|
| ------ | ------ | ------ | ------ | ------ | ------ |  ------ |  ------ |  
| / | GET | [{ id, name, email }]| 200| |||admin
| /:id | GET | { name, id, email, role, registration} | 200/404 | id: number ||{message} |admin
| /byRole/:role | GET | { name, id, email, role, registration} | 200/404 | role: string ||{message} |admin
| /:id | DELETE | {message} | 200/404 | id: number | | {message} |admin
| /:page/:limit | GET | {items, maxPage, rows} | 200/404 | page: number, limit: number | | {message, maxPage} |admin

## /auth
| route | req | success | statuses | params | body |  fail | access|
| ------ | ------ | ------ | ------ | ------ | ------ |  ------ |   ------ |  
| /login | POST | {user} | 200/422/401/500| | {email, password} | {message, detail} | not auth
| /logout | POST | {message, detail} | 200/401 |  | |{message, detail} | auth(all)
| /profile | GET | {user} | 200/401 |  | |{message, detail} | auth(current user)

## /products
| route | req | success | statuses | params | body | fail | access|
| ------ | ------ | ------ | ------ | ------ | ------ |  ------ |  ------ |  
| / | GET | [{ id, title, age, description, price, photo_url, category_id  }]| 200| |||all
| /:id | GET | { title, id, description, price, photo_url, category} | 200/404 | id: number ||{message} |admin
| /:page/:limit | GET | {items, maxPage, rows} | 200/404 | page: number, limit: number | | {message, maxPage} |admin

