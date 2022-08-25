import { Modal } from 'antd';

export default function Alert(s='warning',h,b) {
    if(s==='success'){
        return (
            Modal.success({
                title: h,
                content:(<div>{b}</div>),
            })
        )
    }
    else if(s==='error'){
        return (
            Modal.error({
                title: h,
                content:(<div>{b}</div>),
            })
        )
    }
    else if(s==='warning'){
        return (
            Modal.warning({
                title: h,
                content:(<div>{b}</div>),
            })
        )
    } else {
      return (
        Modal.info({
          title: h,
          content:(<div>{b}</div>)
        })
      )
    }
}
