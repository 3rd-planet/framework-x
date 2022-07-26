# Deployment

Set up your favorite HTTP server so that your api is served. you can use a number of deployment tool, some of them are the following.

## Using Forever

```
[sudo] npm install forever -g
```

There are two ways to use forever: through the command line or by using forever in your code. Note: If you are using forever programmatically you should install **forever-monitor**.

###Command Line

You can use forever to run scripts continuously (whether it is written in node.js or not).

**Example**

```
forever start index.js
```

[click here](https://www.npmjs.com/package/forever) for more details
