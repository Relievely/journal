import {app} from './app';

const port = process.env.PORT;

app.listen(port, () => console.log(`Journal service listening on port: ${port}`))