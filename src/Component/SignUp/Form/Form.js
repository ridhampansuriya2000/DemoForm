import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import StyledTextField from "../../Views/TextInput";
import StyledSelectField from "../../Views/SelectionInput";
import StyledCheckbox from "../../Views/CheckBox";
import StyledRedioButton from "../../Views/RedioButton";

import style from './form.module.css';
import {getMockData} from "../../../utils/functions";

const Form = ({
                  handleSubmit
              }) => {

    const [formData, setFormData] = useState({
        values: {
            formRadio : 'oneops',
            databseCheckBox : [],
            checkBox : [],
        },
        errors: {},
        touched: {},
    });

    React.useEffect( ()=>{
        (async ()=>{
            let data = await getMockData();
            setFormData((preState)=>({
                ...preState,
                values : data
            }))
            window.d = data.org
        })()
    },[])

    const submitFormData = () => {
        handleSubmit(formData.values);
    }

    const formHandler = (e,e2,key) => {
        console.log('event',e,key)
        let {name, value} = e.target;
        setFormData((preState) => ({
            ...preState,
            values: {
                ...preState.values,
                [key ?? name]: key ? {...preState.values[key], [name] : value } : value
            },
            errors: !key ? {
                ...preState.errors,
                [name]: errorHander(name, value)
            } : {...preState.errors},
            touched: !key ? {
                ...preState.touched,
                [name]: true
            } : {...preState.touched}
        }))
    };
    const errorHander = (name, value) => {
        if (!value) {
            return `${name} is required`
        } else if (value) {
            return false;
        }
    }

    return (
        <div>
            <Grid container className={style.formContainer}>
                <Grid xs={11} sm={11} md={11} lg={10} xl={10} item>

                    <Grid container className={style.fieldBox}>
                        <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                            <div className={style.inputLable}>Org <span className={style.redAlrt}>&nbsp; *</span></div>
                        </Grid>
                        <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                            <StyledSelectField fullWidth
                                               name='org'
                                               value={ formData.values.org}
                                               onChange={formHandler}
                            >
                                <MenuItem value={'U.S Omni Tech'}>U.S Omni Tech</MenuItem>
                                <MenuItem value={'Indian Tech'}>Indian Tech</MenuItem>
                                <MenuItem value={'Hindustan Tech'}>Hindustan Tech</MenuItem>
                            </StyledSelectField>
                        </Grid>
                    </Grid>

                    <Grid container className={style.fieldBox}>
                        <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                            <div className={style.inputLable}>Pillar <span className={style.redAlrt}>&nbsp; *</span>
                            </div>
                        </Grid>
                        <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                            <StyledSelectField fullWidth
                                               name='pillar'
                                               value={formData.values?.pillar}
                                               onChange={formHandler}
                            >
                                <MenuItem value={'Supply Chain Tech'}>Supply Chain Tech</MenuItem>
                                <MenuItem value={'Diversity Info'}>Diversity Info</MenuItem>
                                <MenuItem value={'Rudra Tech'}>Rudra Tech</MenuItem>
                            </StyledSelectField>
                        </Grid>
                    </Grid>

                    <Grid container className={style.fieldBox}>
                        <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                            <div className={style.inputLable}>Product <span className={style.redAlrt}>&nbsp; *</span>
                            </div>
                        </Grid>
                        <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                            <StyledSelectField fullWidth
                                               name='product'
                                               value={formData.values?.product}
                                               onChange={formHandler}
                                // helperText={formData.errors?.product}
                            >
                                <MenuItem value={'catalog'}>catalog</MenuItem>
                                <MenuItem value={'Ten'}>Ten</MenuItem>
                                <MenuItem value={'Twenty'}>Twenty</MenuItem>
                                <MenuItem value={'Thirty'}>Thirty</MenuItem>
                            </StyledSelectField>
                        </Grid>
                    </Grid>

                    <Grid container className={style.fieldBox}>
                        <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                            <div className={style.inputLable}>Product Id</div>
                        </Grid>
                        <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                            <StyledTextField fullWidth
                                             placeholder='Product Id'
                                             name='productID'
                                             // helperText={formData.errors?.productID}
                                             value={formData.values?.productID}
                                             onChange={formHandler}
                            />

                        </Grid>
                    </Grid>

                    <Grid container className={style.fieldBox}>
                        <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                            <div className={style.inputLable}>Environment</div>
                        </Grid>
                        <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                            <StyledTextField fullWidth
                                             placeholder='Environment'
                                             name='environment'
                                             // helperText={formData.errors?.environment}
                                             value={formData.values?.environment}
                                             onChange={formHandler}
                            />
                        </Grid>
                    </Grid>

                    <FormControl sx={{marginTop:'15px'}}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue={'oneops'}
                    >
                        <FormControlLabel  onChange={formHandler} name='formRadio' value="oneops" control={<StyledRedioButton />} label="OneOps" />
                        <FormControlLabel  onChange={formHandler} name='formRadio' value="wcnp" control={<StyledRedioButton default/>} label="WCNP" />
                    </RadioGroup>
                    </FormControl>

                    { formData?.values?.formRadio === 'wcnp' ?
                        <>
                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>App Name</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='App Name'
                                                     name='appName'
                                                     // helperText={formData.errors?.appName}
                                                     value={formData.values?.wcnp?.appName}
                                                     onChange={formHandler}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Assembly</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='assembly'
                                                     name='Assembly'
                                        // helperText={formData.errors?.wcnp?.assembly}
                                                     value={formData.values?.wcnp?.assembly}
                                                     onChange={formHandler}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Environment</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='Environment'
                                                     name='Environment'
                                                     // helperText={formData.errors?.wcnp?.environment}
                                                     value={formData.values?.wcnp?.environment}
                                                     onChange={formHandler}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Platform</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='Platform'
                                                     name='platform'
                                                     // helperText={formData.errors?.wcnp?.platform}
                                                     value={formData.values?.wcnp?.platform}
                                                     onChange={formHandler}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Concord</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='Concord'
                                                     name='concord'
                                        // helperText={formData.errors?.wcnp?.concord}
                                                     value={formData.values?.wcnp?.concord}
                                                     onChange={formHandler}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Looper</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='Looper'
                                                     name='looper'
                                        // helperText={formData.errors?.wcnp?.looper}
                                                     value={formData.values?.wcnp?.looper}
                                                     onChange={formHandler}
                                    />
                                </Grid>
                            </Grid>
                        </>
                        :
                        <>
                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Name Space</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='Name Space'
                                                     name='nameSpace'
                                        // helperText={formData.errors?.wcnp?.nameSpace}
                                                     value={formData.values?.wcnp?.nameSpace}
                                                     onChange={formHandler}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>App Name</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='App Name'
                                                     name='appName'
                                                     // helperText={formData.errors?.wcnp?.appName}
                                                     value={formData.values?.wcnp?.appName}
                                                     onChange={formHandler}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Clusters</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='Clusters'
                                                     name='clusters'
                                                     // helperText={formData.errors?.wcnp?.clusters}
                                                     value={formData.values?.wcnp?.clusters}
                                                     onChange={formHandler}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Kitt File</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='Kitt File'
                                                     name='kittFile'
                                                     // helperText={formData.errors?.wcnp?.kittFile}
                                                     value={formData.values?.wcnp?.kittFile}
                                                     onChange={formHandler}
                                    />
                                </Grid>
                            </Grid>
                        </>
                    }

                        <Typography variant="h4" className={style.justifyStart} gutterBottom>
                            CCM
                        </Typography>

                    {
                         formData?.values?.ccm?.map((item,index)=>(
                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={12} lg={12} xl={4} className={style.subFieldBox} item>
                                    <Grid container>
                                        <Grid xs={12} sm={12} md={2} lg={2} xl={2} item>
                                            <div className={style.inputLable}>URL</div>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={10} lg={10} xl={10} item>
                                            <StyledTextField fullWidth
                                                             placeholder='Url'
                                                             name='url'
                                                // helperText={formData.errors?.ccm[index]?.url}
                                                //              value={formData.values?.ccm[index]?.url}
                                                             value={item?.url}
                                                             onChange={formHandler}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid >

                                <Grid xs={12} sm={12} md={12} lg={12} xl={4} className={style.subFieldBox} item>
                                    <Grid container>
                                        <Grid xs={12} sm={12} md={2} lg={2} xl={2} item>
                                            <div className={style.inputLable}>Path</div>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={10} lg={10} xl={10} item>
                                            <StyledTextField fullWidth
                                                             placeholder='Path'
                                                             name='path'
                                                // helperText={formData.errors?.ccm[index]?.url}
                                                //              value={formData.values?.ccm[index]?.path}
                                                             value={item?.path}
                                                             onChange={formHandler}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid >
                                {formData?.values?.ccm?.length -1  === index &&
                                <Grid xs={12} sm={12} md={12} lg={12} xl={4} className={`${style.alienCenter} ${style.subFieldBox}`} item>
                                    <Button variant="contained" sx={{
                                        margin:'10px 0px'
                                    }}>Add New Entery</Button>
                                </Grid >}

                            </Grid>
                        ))
                    }


                        <Typography variant="h4" className={style.justifyStart} gutterBottom>
                            Secrets
                        </Typography>

                    {
                        formData?.values?.ccm?.map((secrets,index)=>(
                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={12} lg={12} xl={4} className={style.subFieldBox} item>
                                    <Grid container>
                                        <Grid xs={12} sm={12} md={2} lg={2} xl={2} item>
                                            <div className={style.inputLable}>URL</div>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={10} lg={10} xl={10} item>
                                            <StyledTextField fullWidth
                                                             placeholder='Secrets Urls'
                                                             name='secretsUrls'
                                                // helperText={formData.errors?.secretsUrls}
                                                             value={secrets?.url}
                                                             onChange={formHandler}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid >

                                <Grid xs={12} sm={12} md={12} lg={12} xl={4} className={style.subFieldBox} item>
                                    <Grid container>
                                        <Grid xs={12} sm={12} md={2} lg={2} xl={2} item>
                                            <div className={style.inputLable}>Path</div>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={10} lg={10} xl={10} item>
                                            <StyledTextField fullWidth
                                                             placeholder='Secret Path'
                                                             name='secretPath'
                                                // helperText={formData.errors?.secretPath}
                                                             value={secrets?.path}
                                                             onChange={formHandler}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid >
                                {formData?.values?.ccm?.length - 1 === index &&
                                <Grid xs={12} sm={12} md={12} lg={12} xl={4}
                                      className={`${style.alienCenter} ${style.subFieldBox}`} item>
                                    <Button variant="contained" sx={{
                                        margin: '10px 0px'
                                    }}>Add New Entery</Button>
                                </Grid>
                                }

                            </Grid>
                        ))
                    }

                        <Typography variant="h3" className={style.justifyStart} gutterBottom>
                            Database
                        </Typography>

                        <Grid container>
                            <Grid xs={12} sm={12} md={6} lg={6} xl={6} sx={{display:'flex', alignItems:'start', flexDirection:'column'}} item>
                                <span><StyledCheckbox color="success" name='database'/> Meghacache</span>
                                <span><StyledCheckbox color="success" name='database'/> Elasticsearch</span>
                                <span><StyledCheckbox color="success" name='database'/> Storm</span>
                                <span><StyledCheckbox color="success" name='database'/> Storm</span>
                            </Grid>
                            <Grid xs={12} sm={12} md={6} lg={6} xl={6} sx={{display:'flex', alignItems:'start', flexDirection:'column'}}  item>
                                <span><StyledCheckbox color="success" name='database' /> Kafta</span>
                                <span><StyledCheckbox color="success" name='database' /> Soir</span>
                                <span><StyledCheckbox color="success" name='database' /> Soir</span>
                            </Grid>
                        </Grid>

                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>ClusterName</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='ClusterName'
                                                 name='clusterName'
                                    // helperText={formData.errors?.clusterName}
                                                 value={formData.values?.clusterName}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>Version</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='Version'
                                                 name='version'
                                                 helperText={formData.errors?.version}
                                                 value={formData.values?.version}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>Data Centers</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='Data Centers'
                                                 name='dataCenters'
                                                 helperText={formData.errors?.dataCenters}
                                                 value={formData.values?.dataCenters}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>Team Contact</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='Team Contact'
                                                 name='teamContact'
                                                 helperText={formData.errors?.teamContact}
                                                 value={formData.values?.teamContact}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>MMSDC View</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='MMSDC View'
                                                 name='mmsdcView'
                                                 helperText={formData.errors?.mmsdcView}
                                                 value={formData.values?.mmsdcView}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>MMS Cluster View</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='MMS Cluster View'
                                                 name='mmsClusterView'
                                                 helperText={formData.errors?.mmsClusterView}
                                                 value={formData.values?.mmsClusterView}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>
                        ---------------------------------------------------------------------------------------------------------------
                        <Grid container>
                            <Grid xs={12} sm={12} md={6} lg={6} xl={6} sx={{display:'flex', alignItems:'start', flexDirection:'column'}} item>
                                <span><StyledCheckbox color="success" name='container'/> Meghacache</span>
                                <span><StyledCheckbox color="success" name='container'/> Elasticsearch</span>
                                <span><StyledCheckbox color="success" name='container'/> Storm</span>
                            </Grid>
                            <Grid xs={12} sm={12} md={6} lg={6} xl={6} sx={{display:'flex', alignItems:'start', flexDirection:'column'}}  item>
                                <span><StyledCheckbox color="success" name='container' /> Kafta</span>
                                <span><StyledCheckbox color="success" name='container' /> Soir</span>
                            </Grid>
                        </Grid>

                        <Typography variant="h4" className={style.justifyStart} gutterBottom>
                            Kafka
                        </Typography>
                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>Cluster</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='Cluster'
                                                 name='cluster'
                                                 helperText={formData.errors?.cluster}
                                                 value={formData.values?.cluster}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>Topic</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='Topic'
                                                 name='topic'
                                                 helperText={formData.errors?.topic}
                                                 value={formData.values?.topic}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>Lense URL</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='Username'
                                                 name='userName'
                                                 helperText={formData.errors?.userName}
                                                 value={formData.values?.userName}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>


                        <Button variant="contained"
                                color="success"
                                sx={{
                                    borderRadius: 28,
                                    width: '30%'
                                }}
                                onClick={submitFormData}
                        >
                            Submit
                        </Button>
                        </Grid>
                        </Grid>
                    }

        </div>
    )
}

export default Form;