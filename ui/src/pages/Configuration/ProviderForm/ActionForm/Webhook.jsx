import Input from "src/components/Input/Input"
import Select from "src/components/Select/Select"
import Textarea from "src/components/Textarea/Textarea"
import { Controller } from "react-hook-form"
import TitleDescription from "src/components/TitleDescription/TitleDescription"
import { useEffect } from "react"


const Webhook = ({ register, setValue,  control, errors, ...props })=> {

    const actionTypes = [
        { label: "Send", value: "send" }
    ]

    useEffect(()=>{

        setValue("actionName", props.name)
        setValue("actionDescription", props.description)
        setValue("actionBody", JSON.stringify(props.body, undefined, 2))
    
    }, [])

    return(
        <div>
            <div>
                <Input label={<span className="span-important">Action Name</span>} hasError={errors["actionName"]?.message} errorMessage={errors["actionName"]?.message} {...register("actionName", { required :"This field is required" })}  onChange={(e)=>props.onNameChange(e.target.value)} />
            </div>
            <div>
                <Textarea label={<span className="span-important">Description</span>} rows={4} style={{resize: "vertical"}} hasError={errors["actionDescription"]?.message} errorMessage={errors["actionDescription"]?.message} {...register("actionDescription", { required :"This field is required" })}   />
            </div>
            <div>
                <Controller 
                    control={control}
                    name="actionType"
                    rules={{
                        required: "This field is required"
                    }}
                    defaultValue={props.type == "" ? actionTypes[0].value : actionTypes.find(val=>val.value == props.type)?.value}
                    render={({ field: { onChange, value, ref } })=>(
                        <Select 
                            inputRef={ref} 
                            label={ <span className="span-important">Action Type</span> } 
                            value={ props.type ?  actionTypes.find(val=>val.value == props.type) : actionTypes[0]}
                            options={actionTypes} 
                            onChange={val=>onChange(val.value)} />
                    )}
                
                />
            </div>
            <div>
                <TitleDescription title="Request Body"  description="Contains information about the event that triggered the webhook."/>
                <Textarea rows={4} style={{resize: "vertical"}}  hasError={errors["actionBody"]?.message} errorMessage={errors["actionBody"]?.message} {...register("actionBody", { required :"This field is required" })}   />
            </div>
        </div>   
    )
}

export default Webhook