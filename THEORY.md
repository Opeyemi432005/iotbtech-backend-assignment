## CLASS 31: Node.js Runtime, Buffer, Streams & Bun ##

## 1. 
This is the output of the the first line. The (process.argv) is an array  that's is used to print all command line argument that a user useed to start a Node.js program without ignoring none 
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Admin\\Desktop\\Ass Test\\app.js',
  '--port',
  '8080',
  '--host',
  'localhost'
]

 This is the output of the second line The (process.argv.slice(2)); this means we're printing the array argument starting from index 2 which means we skip or ignore  the index 0 and 1
[ '--port', '8080', '--host', 'localhost' ]

## 2
We almost and always use the (process.argv.slice(2)) and not (process.argv) directly in a real CLI tools because (process.argv) contains  some two informations which is not needed by the CLI, and (process.argv.slice(2)) only  contain an array of the users actual command line argument which is what we need the CLI to focuses on

Also if someone runs my script from a different folder or wrapper like bun run app.js it will still be the same regardless

## 3
Below is the output when run with node 
PS C:\Users\Admin\Desktop\Ass Test> node app.js
10
5
5
The first two numbers are different from each other because the first the line has an Arabic word with 5 characters in length which in UTF-8  the Arabic character takes 2 bytes per character to store it which is 5*2 = 10

While the second output number is for the second line console is an English word with also 5 characters which in UTF-8 each English character uses 1 byte each to store  i.e 5*1 = 5 

The third line gives a different output because it only counts the numbers of characters not the bytes

## 4
The readFileSync() is a bad approach and it will crash the machine because it read the entire  huge.log file at one before processing it, then store it on ones computer storage RAM 
By processing a 5gb log file on a machine with 8gb of RAM will cause excessive memory usage and also make the system very slow because it has consume a huge proportion of the available memory 
 
While createReadStream() avoid and solve this reading the same file by reading the file piece by piece then process it doesn't read the entire file at once

## 5 
pipe() is used to  connects a readable stream to a writable stream, while pipeline() connects them and also coordinates error handling and cleanup.  For example, if I use pipe() to copy a large file and an error occur while copying to the destination disk,  I may need to manually handle errors and cleanup.

But With pipeline(), it handles the clean-up for a stream failure is propagated and the streams are cleaned up, making the failure easier and safer to handle.

## 6
PS C:\Users\Admin\Desktop\Ass Test> node app.js
4e6f64652e6a73
Tm9kZS5qcw==
The above is the output after running and it's also the expected output.

## 7
“Streams keep memory flat” means that memory usage stays roughly constant it doesn't increase as the amount of data being processed increases.

 A bucket approach stores all the rows in memory, so going from 10,000 to 10,000,000 rows causes memory usage increases and to grow roughly linearly.
While A pipe/stream approach processes the data in small pieces or chunks, so it does not need to keep the entire file in memory and its memory usage doesn't increase it stays  flat.

## 8
un provides several tools directly in its runtime/toolchain that plain Node does not traditionally provide, such as direct TypeScript execution, a built-in SQLite API, and a built-in bundler. On a real team project, I would generally reach for Node when ecosystem compatibility and established tooling are the priority, while I would choose Bun when its integrated tooling can simplify the project and the team's dependencies are compatible with it.

## CLASS 32: Express & TypeScript
## 9 
Express checks routes from top to bottom, and the first matching route that sends a response wins. Therefore, /api/products/featured is caught by /api/products/:id first, with id equal to "featured", so the /featured route is never reached. /api/products/42 also matches the :id route and returns id: "42". /api/products does not match either GET route because neither has a matching path without an ID, so it reaches the app.use("/api/products", ...) fallback and returns "fallback".

## 10 
req.params.id is a string because route parameters come from the URL.

To convert it to a number,  we add number before it as a prefix that's Number(req.params.id).

Express does not convert it automatically because URL parameters are text, 
and Express cannot know whether a value such as "42" should be treated as a number or as a string identifier.

## 11 
Routes define API endpoints and connect requests to controllers. 

Controllers handle HTTP requests and responses and call the appropriate service.

Services handles and  contain the  data logic. 

If products change from a plain array to a CSV loaded at boot,   I would edit only product.service.ts, because the service is responsible for the data-access logic while the routes and controllers can continue using the same service methods without knowing where the data comes from.
