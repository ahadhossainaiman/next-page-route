import CustomLink from '@base/components/CustomLink';
import { ImagePaths, Paths } from '@lib/constant';
import { cn } from '@lib/utils';
import { IProject } from '@modules/admin/projects/lib/interfaces';
import { Badge, Button, Divider } from 'antd';
import React from 'react';

interface IProps {
  className?: string;
  project: IProject;
  // onFinish: (project: IProject) => void;
}

const ProjectCard: React.FC<IProps> = ({
  className,
  project,
  //  onFinish
}) => {
  // const router = useRouter();
  // const { isAuthenticate } = useAuthSession();

  return (
    <div
      className={cn(
        'project_card flex flex-col gap-4 border border-gray-500 p-8 rounded-lg bg-[var(--color-secondary-bg)]',
        className,
      )}
    >
      <div className="image_container">
        <Badge.Ribbon text="On-Going">
          <img src={project?.banner || ImagePaths.placeHolder} alt="" className="w-full h-64 object-cover rounded-lg" />
        </Badge.Ribbon>
      </div>
      <div className="content_wrapper">
        <p className="font-medium text-2xl line-clamp-1">{project?.title}</p>
        <p className="dark:text-gray-300 text-sm line-clamp-1">{project?.about}</p>
        <Divider style={{ marginBlock: '16px' }} />
        {/* <Progress percent={30} showInfo={false} strokeColor="var(--color-primary)" /> */}
        <div className="flex flex-wrap gap-4 mt-4">
          {/* <Button
            size="large"
            type="primary"
            className="w-full"
            onClick={() =>
              isAuthenticate
                ? onFinish(project)
                : router.push({
                    pathname: Paths.auth.signIn,
                    query: { [REDIRECT_PREFIX]: `${Env.webHostUrl}/${router.asPath}` },
                  })
            }
          >
            Invest Now
          </Button> */}
          <CustomLink href={Paths.projects.toId(project?.id)} className="w-full">
            <Button size="large" type="primary" ghost className="w-full">
              Get Started
            </Button>
          </CustomLink>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
