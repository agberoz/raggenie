import Input from "src/components/Input/Input"
import Select from "src/components/Select/Select"
import Textarea from "src/components/Textarea/Textarea"
import { Controller } from "react-hook-form"
import TitleDescription from "src/components/TitleDescription/TitleDescription"
import { useEffect } from "react"
import { isJSON } from "src/utils/utils"


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
                    defaultValue={props.type == "" ? props.actions[0].value : props.actions.find(val=>val.value == props.type)?.value}
                    render={({ field: { onChange, value, ref } })=>(
                        <Select 
                            inputRef={ref} 
                            label={ <span className="span-important">Action Type</span> } 
                            value={ props.type ?  props.actions.find(val=>val.value == props.type) : props.actions[0]}
                            options={props.actions}     
                            onChange={val=>onChange(val.value)} 
                            hasError={errors["actionType"]?.message} 
                            errorMessage={errors["actionType"]?.message} />
                    )}
                
                />
            </div>
            <div>
                <TitleDescription title="Request Body"  description="Contains information about the event that triggered the webhook."/>
                <Textarea rows={4} style={{resize: "vertical"}}  hasError={errors["actionBody"]?.message} errorMessage={errors["actionBody"]?.message} {...register("actionBody", { required :"This field is required", validate: value => isJSON(value) || "invalid JSON" })}   />
            </div>
        </div>   
    )
}

export default Webhook