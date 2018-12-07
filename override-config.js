
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = (config, env) => {
  if(env==='test')
    return config;
    
  //移出ModuleScopePlugin插件的目录检测
  config.resolve.plugins.forEach((plugin,idx)=>{
    if(plugin.hasOwnProperty('appSrc') && plugin.hasOwnProperty('allowedFiles'))
      config.resolve.plugins.splice(idx,1);
  }) 

  //解决Rules多目录include
  config.module.rules.forEach(rule=>{
    if(rule.hasOwnProperty('include'))
    {
      rule['include']= [ resolveApp('src'),resolveApp('site'),resolveApp('libs')]
    }else if(rule.hasOwnProperty('oneOf')){
      rule.oneOf.forEach(oneOfRule=>{
        if(oneOfRule.hasOwnProperty('include'))
        {
          oneOfRule['include']= [ resolveApp('src'),resolveApp('site'),resolveApp('libs')]
        }
        if(oneOfRule.loader && oneOfRule.loader.includes('file-loader')){
          oneOfRule.exclude.push(/\.md$/)
        }
      })
       //添加md文件读取
       rule.oneOf.push({
        test: /\.md$/,
        loader : require.resolve('raw-loader'),
        include:  [ resolveApp('src'),resolveApp('site'),resolveApp('libs')],
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      })
    }
  }) 
  //console.log(JSON.stringify(config))
  return config;
}
