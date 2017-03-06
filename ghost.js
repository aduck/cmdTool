#!/usr/bin/env node

// 引用模块
const cp=require('child_process')
const yargs=require('yargs')
const fs=require('fs')
const os=require('os')

// 命令行
const argv=yargs
  .option('c',{
    alias:'cmd',
    demand:true,
    default:'hello',
    describe:'tell me your cmd',
    type:'string'
  })
  .argv

// argv
let c=argv.c
let v=argv.v

switch(c){
  // hello
  case 'hello':
    console.log('hello ghost!')
    break
  // 获取用户进程
  case 'tasklist':
    getTaskList()
    break
  // 杀死进程
  case 'killtask':
    killTask(v)
    break
  // 读取计算机配置
  case 'os':
    getOSInfo()
    break
  default:
    console.log('unknown cmd!')
}

function getTaskList(){
  cp.exec('tasklist',(err,stdout,stderr)=>{
    if(err){
      console.log('进程读取失败')
      return
    }
    console.log(stdout)
  })
}

function getOSInfo(){
  let cpus=os.cpus()
  let cpu=`cpu信息：${cpus.length}核 ${cpus[0].model}`
  let memory=`内存信息：${os.freemem()}/${os.totalmem()}`
  let platform=`操作系统：${os.platform()}`
  let network=`网卡信息：${JSON.stringify(os.networkInterfaces())}`
  let homedir=`用户根目录：${os.homedir()}`
  let hostname=`用户名：${os.hostname()}`
  console.log({
    cpu,
    memory,
    platform,
    network,
    homedir,
    hostname
  })
}

function killTask(pid){
  process.kill(pid)
  console.log(`pid为${pid}进程已退出`)
}