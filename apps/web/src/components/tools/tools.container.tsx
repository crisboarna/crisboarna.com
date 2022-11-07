import Tools from './tools.ui';
import { ITool } from './index';

export interface ToolsContainerProps {
  readonly tools: ITool[];
}

const ToolsContainer = ({ tools }: ToolsContainerProps) => (
  <Tools tools={tools} />
);

export default ToolsContainer;
