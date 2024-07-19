import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { FaGem } from 'react-icons/fa';
import sidebarBg from '../../assets/bg3.jpg';
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import './SideBar.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SideBar = (props) => {
    const navigate = useNavigate();
    const hanbleBackHome = () => {
        navigate('/')
    }
    const { t } = useTranslation();
    const { collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        className='sidebarHeader'
                    >
                        <DiReact size={'3em'} color={"00bfff"} />
                        <span className='op' onClick={() => hanbleBackHome()}>Mizzon</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                        // suffix={<span className='badge red'>New</span>}
                        >
                            <Link to="/admins">{t('sidebar.title1')}</Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title={t('sidebar.title5')}
                        >
                            <MenuItem>
                                <Link to="/admins/manage-users">{t('sidebar.title2')}</Link>
                            </MenuItem>
                            <MenuItem >
                                <Link to="/admins/manage-quizes"></Link>{t('sidebar.title3')}</MenuItem>
                            <MenuItem>
                                <Link to="/admins/manage-questions">{t('sidebar.title4')}</Link>
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/Mizzonnnnnn/reactjs-zero"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                &#169; Mizzon
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar >
        </>
    )
}
export default SideBar