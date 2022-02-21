import React, { useEffect, useState } from 'react';
import BaseForm from 'components/BaseForm';
import Input from 'components/Input';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SelectForm from 'components/SelectForm';
import { getAllProyectos, getbyidProyecto } from 'servicios/proyecto';
import { auth } from 'servicios/auth';
import Loading from 'components/Loading';
import {
  createIssue,
  getIssue,
  createComment,
  updateIssue,
} from 'servicios/issues';
import { toast } from 'react-toastify';
import { getProjectDevelopers } from 'servicios/usuer';
import ButtonForm from 'components/ButtonForm';
import IssueComment from 'components/IssueComment';

const FormIssue = () => {
  const [loading, setLoading] = useState(true);
  const [issue, setissue] = useState();
  const [originProject, setOriginProject] = useState();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCreate, setIsCreate] = useState(true);
  const [optionsProyectos, setoptionsProyectos] = useState([]);
  const [proyecto, setproyecto] = useState('');
  const [optionsDevelopers, setoptionsDevelopers] = useState([]);
  const [developer, setdeveloper] = useState();
  const [optionsCategoria] = useState([
    { value: 'MissingTask', label: 'MissingTask' },
    { value: 'Bug', label: 'Bug' },
    { value: 'Additional', label: 'Additional' },
  ]);
  const [categoria, setCategoria] = useState('');
  const [optionsPrioridad] = useState([
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
  ]);
  const [prioridad, setprioridad] = useState('');
  const [optionsStatus, setoptionsStatus] = useState([]);
  const [status, setstatus] = useState('');
  const [hourEstimate, sethourEstimate] = useState(0);
  const [dueDate, setdueDate] = useState('');
  const [descripción, setDescripción] = useState('');
  const [comment, setcomment] = useState('');

  const [allowStatus, setallowStatus] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (isCreate) {
        await createIssue(
          {
            description: descripción,
            category: categoria,
            priority: prioridad,
            dueDate,
            project: proyecto,
          },
          auth.id
        );
        toast.success('Issue creado');
        navigate('/issues');
      } else {
        sendUpdateIssue();
      }
    } catch {
      toast.error('Error');
    }
  };

  const getCurrentIssue = () => {
    getIssue(id, auth.id).then(async (i) => {
      setissue(i);
      setprioridad(i.priority);
      if (!i.developer) {
        getProjectDevelopers(i.projectId, auth.id).then((developers) => {
          setoptionsDevelopers(
            developers.map((dev) => ({ value: dev.id, label: dev.email }))
          );
        });
      }
      setListStatus(i);
      setLoading(false);
    });
  };

  useEffect(async () => {
    if (location.pathname.includes('/CrearIssue')) {
      setIsCreate(true);
      if (id) {
        setOriginProject(await getbyidProyecto(id, auth.id));
        setproyecto(id);
        setLoading(false);
      } else {
        getAllProyectos(auth.id).then((p) => {
          setoptionsProyectos(
            p.map((proj) => ({ value: proj.id, label: proj.name }))
          );
        });
        setLoading(false);
      }
    } else if (id) {
      getCurrentIssue();
      setIsCreate(false);
    }
  }, []);

  const setListStatus = (i) => {
    let statusList = [];
    switch (auth.role) {
      case 'Administrador':
        statusList = [
          { value: 'InternalValidation', label: 'InternalValidation' },
          { value: 'ClientValidation', label: 'ClientValidation' },
        ];
        break;
      case 'Cliente':
        statusList = [
          { value: 'ClientValidation', label: 'ClientValidation' },
          { value: 'Closed', label: 'Closed' },
        ];
        break;
      case 'Desarrollador':
        statusList = [
          { value: 'Estimated', label: 'Estimated' },
          { value: 'InternalValidation', label: 'InternalValidation' },
        ];
        break;
      default:
        break;
    }
    setallowStatus(statusList.find((s) => s.value === i.status));
    setoptionsStatus(statusList);
  };

  const sendComment = async () => {
    await createComment({ comment, issue: issue.id }, auth.id);
    getCurrentIssue();
  };

  const sendUpdateIssue = async () => {
    await updateIssue(
      issue.id,
      {
        category: categoria,
        priority: prioridad,
        developer,
        hourEstimate,
        status,
      },
      auth.id
    );
    toast.success('Issue actualizado');
    navigate('/issues');
  };
  return loading ? (
    <Loading />
  ) : (
    <div className={!isCreate ? 'flex grid grid-cols-2 h-full' : ''}>
      <div className={!isCreate ? 'h-screen overflow-y-scroll px-3' : ''}>
        <BaseForm
          title={isCreate ? 'Nuevo issue' : 'Issue'}
          onSubmit={submitForm}
          titleSubmit={isCreate ? 'Crear issue' : 'Actualizar'}
          onCancelar={() => {
            navigate('/issues');
          }}
        >
          <SelectForm
            title='Proyecto'
            options={optionsProyectos}
            onChange={(e) => {
              setproyecto(e.value);
            }}
            defaultValue={() => {
              if (originProject) {
                return { label: originProject.name, value: originProject.id };
              }
              if (issue) {
                return { label: issue.project.name, value: issue.project.id };
              }
              return null;
            }}
            disabled={originProject || !isCreate}
          />
          {!isCreate ? (
            <SelectForm
              disabled={
                (isCreate && !(proyecto || proyecto !== '')) ||
                auth.role !== 'Administrador'
              }
              title='Desarrollador'
              options={optionsDevelopers}
              onChange={(e) => {
                setdeveloper(e.value);
              }}
              defaultValue={() => {
                if (!isCreate && issue.developer) {
                  return {
                    value: issue.developerId,
                    label: issue.developer.email,
                  };
                }
                return null;
              }}
            />
          ) : null}

          <SelectForm
            title='Categoria'
            options={optionsCategoria}
            onChange={(e) => {
              setCategoria(e.value);
            }}
            disabled={!isCreate && auth.role !== 'Administrador'}
            defaultValue={
              !isCreate
                ? { value: issue.category, label: issue.category }
                : null
            }
          />

          <SelectForm
            title='Prioridad'
            options={optionsPrioridad}
            onChange={(e) => {
              setprioridad(e.value);
            }}
            disabled={!isCreate && auth.role !== 'Cliente'}
            defaultValue={
              !isCreate
                ? { value: issue.priority, label: issue.priority }
                : null
            }
          />
          {!isCreate ? (
            <SelectForm
              title='Status'
              options={optionsStatus}
              onChange={(e) => {
                setstatus(e.value);
              }}
              defaultValue={
                !isCreate ? { value: issue.status, label: issue.status } : null
              }
              disabled={!allowStatus}
            />
          ) : null}
          {!isCreate ? (
            <Input
              text='Horas estimadas'
              name='hourEstimate'
              placeholder='Ingresa horas estimadas'
              type='number'
              value={issue.hourEstimate}
              onChange={(e) => {
                sethourEstimate(e.target.value);
              }}
              disabled={auth.role !== 'Desarrollador'}
            />
          ) : null}

          <Input
            text='Fecha de vencimiento'
            name='dueDate'
            placeholder='Ingresa fecha de vencimiento'
            type='Date'
            value={issue ? issue.dueDate.split('T')[0] : dueDate}
            onChange={(e) => {
              setdueDate(e.target.value);
            }}
            disabled={!isCreate}
          />
          {!isCreate ? (
            <Input
              text='Fecha de cierre'
              name='closeDate'
              placeholder='Ingresa fecha de cierre'
              type='Date'
              value={issue.closeDate ? issue.closeDate.split('T')[0] : dueDate}
              disabled
            />
          ) : null}

          <div className='w-full'>
            <span className='block text-gray-700 text-lg font-bold mb-2 ml-6'>
              Descripción
            </span>
            <textarea
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='Descripción'
              rows='10'
              placeholder='Descripción'
              value={!isCreate ? issue.description : descripción}
              disabled={!isCreate}
              onChange={(e) => {
                setDescripción(e.target.value);
              }}
            />
          </div>
        </BaseForm>
      </div>
      {!isCreate ? (
        <div className='h-screen overflow-y-scroll px-3'>
          <h1 className='text-4xl font-bold text-gray-800 my-10  font-sans'>
            Comentarios
          </h1>
          <div className='w-full'>
            <textarea
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='Descripción'
              rows='3'
              placeholder='Comentario nuevo'
              value={comment}
              onChange={(e) => {
                setcomment(e.target.value);
              }}
            />
            <ButtonForm
              text='Comentar'
              submit={false}
              onclick={sendComment}
              disabled={!(comment && comment.length > 0)}
            />
          </div>
          {issue.IssueComments.map((com) => {
            return (
              <IssueComment comment={com.comment} user={com.createdBy.email} />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default FormIssue;
