import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  card_main:{
    background:'white',
    display:'inline-block',
    padding:'20px 0px 10px 10px',
    margin:30,
    borderRadius:10
  },
  name:{
    marginBottom:20,
    marginLeft:10,
    fontSize:15,
    fontWeight:500
  },
  d:{
    display:'flex',
    color:'darkblue'
  },
  d1:{
    paddingTop:10,
    fontSize:40,
    fontWeight:700
  },
  d2:{
    paddingTop:30,
    fontSize:20,
    fontWeight:600
  },
  img:{
    marginLeft:30,
    width:120,
    height:100
  }
})

export const MainCard = (props)=>{
  const classes = useStyles();
  return(
    <div className={classes.card_main}>
      <div className={classes.name}>
        {props.title}
      </div>
      <div className={classes.d}>
        <span className={classes.d1}>{props.value}</span>
        <span className={classes.d2}>/{props.total}</span>
        <img src={props.image} className={classes.img} alt=''/>
      </div>
    </div>
  )
}