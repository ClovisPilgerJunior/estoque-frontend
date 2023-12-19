export interface User {
  senhaVisivel: boolean;
  id?: number;
  name: string;
  password: string;
  profiles: string[];
  ativo: boolean;
}
